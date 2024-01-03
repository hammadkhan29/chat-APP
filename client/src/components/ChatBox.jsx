import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { useFetchRecipient } from '../hooks/useFetchRecipient'
import { useFetchCurrentRecipient } from '../hooks/useFetchCurrentRecipient'
import { Button, Stack } from 'react-bootstrap'
import Notification from './Notification'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat , messages  , sendTextMessage , updateCurrentChat} = useContext(ChatContext)
    const [textMessage , setTextMessage] = useState('')
    const {recipientUser1} = useFetchCurrentRecipient(currentChat , user)
//    const recipientUser = JSON.parse(localStorage.getItem('recipient'))
///    console.log('recipient user',recipientUser1)
 //   console.log('1',textMessage)
  //  console.log('current chat' , currentChat)
    const scroll = useRef()
    
    useEffect(()=>{
      scroll.current?.scrollIntoView({behavior: 'smooth'})
    } , [messages])
//     if (!recipientUser) return <p style={{textAlign:'center' , width:'100%'}}>No conversation yet..</p>
  return (
    <>
    <Stack className='chat-box'>
    <div className="chat-header" style={{display:'flex'}}>
    <div >
    <strong style={{fontSize:'24px'}}>{recipientUser1?.name}</strong>
  </div>  
  <div style={{marginLeft:'auto', cursor:'pointer' }} 
  onClick = {()=>{
      updateCurrentChat(null)
  }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg></div>
</div>
      <Stack className='messages'>
          {messages && messages.map((message , index)=>{
            return (
              <Stack key={index} className={`${message?.senderId === user?._id ?
                "message self ml-auto mt-2 flex-grow-0": 
                "message flex-grow-0"}`} ref={scroll}>
                  <span >{message.text}</span>
                  <span className='message-footer'>
                  {moment(message.createdAt).calendar()}</span>
              </Stack>
            )
          })}
      </Stack>
      <Stack className='chat-input flex-grow-0 '>
          <InputEmoji value={textMessage} onChange={setTextMessage}
          borderColor='rgba(72,122,223,0.2)'/>
          <Button className='send-btn' onClick={()=> sendTextMessage(textMessage , user , currentChat?._id , setTextMessage )}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-send-fill" viewBox="0 0 16 16">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>
          </Button>
      </Stack>
    </Stack>
    </>
  )
}

export default ChatBox
