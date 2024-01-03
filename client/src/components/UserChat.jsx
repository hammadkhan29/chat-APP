import React, { useContext } from 'react'
import { useFetchRecipient } from '../hooks/useFetchRecipient'
import { Stack } from 'react-bootstrap'
import Avatar from '../assets/avatar.svg'
import { ChatContext } from '../context/ChatContext'
import { unreadNotification } from '../utils/unreadNotification'
import { useFetchLatestMessage } from '../hooks/useFetchLatestMessage'
import moment from 'moment'
const UserChat = ({chat , user}) => {
    const {recipientUser} = useFetchRecipient({chat , user})
//    console.log('user chat recipient' ,recipientUser)
    const {onlineUser , notifications , markThisUserNotificationAsRead} = useContext(ChatContext)
    const isOnline = onlineUser?.some((user)=> user?.userId === recipientUser?._id )
    const {latestMessage} = useFetchLatestMessage(chat)
    const modiNotification = unreadNotification(notifications)
    const thisUserNotification = modiNotification?.filter(
        (n)=> n.senderId == recipientUser?._id
        )

    const truncatText = (text) =>{
            let shortText = text.substring(0,20)
            if (text.length > 20){
                shortText = shortText + '...'
            }
            return shortText
        }

    return (
    <Stack
     className='d-flex user-card align-items-center p-2 justify-content-between'
     role='button'
     style={{cursor:'pointer'}}
     onClick={()=>{
        if (thisUserNotification?.length > 0){
            markThisUserNotificationAsRead(thisUserNotification,notifications)
        }}}
     >
    <div className='d-flex'>
        <div className='mr-2' >
        <img src={Avatar} height='35px'/>
        </div>
        <div className='text-content'>
            <div className='name'>
                {recipientUser?.name}
            </div>
            <div className='text'>
                {latestMessage?.text && (
                    <span>{truncatText(latestMessage?.text)}</span>
                )}
            </div>
        </div>
    </div>
    <div className='d-flex flex-column align-items-end'>
        <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
        <div className={thisUserNotification?.length > 0 ? "this-user-notifications" : null}>
        {thisUserNotification?.length > 0 ? thisUserNotification.length : null}
        </div>
        <div className={isOnline ? "user-online" : ''}></div>
    </div>
    </Stack>
  )
}

export default UserChat
