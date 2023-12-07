import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { useFetchRecipient } from '../hooks/useFetchRecipient'
import { Button, Stack } from 'react-bootstrap'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'
const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat , messages , isLoading , sendTextMessage} = useContext(ChatContext)
    const [textMessage , setTextMessage] = useState('')
//    const {recipientUser} = useFetchRecipient(currentChat || [] , user)
    const recipientUser = JSON.parse(localStorage.getItem('recipient'))
    console.log('recipient user',recipientUser)
    console.log(textMessage)
    
//     if (!recipientUser) return <p style={{textAlign:'center' , width:'100%'}}>No conversation yet..</p>
  return (
    <Stack className='chat-box'>
    <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
    </div>  
    <Stack className='messages'>
        {messages && messages.map((message , index)=>{
           return (
            <Stack key={index} className={`${message?.senderId === user?._id ?
               "message self ml-auto mt-2 flex-grow-0": 
               "message flex-grow-0"}`}>
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
         <Button className='send-btn' onClick={()=> sendTextMessage(textMessage , user , currentChat._id , setTextMessage )}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-send-fill" viewBox="0 0 16 16">
         <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
       </svg>
         </Button>
    </Stack>
    </Stack>
  )
}

export default ChatBox