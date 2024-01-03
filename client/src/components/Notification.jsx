import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { unreadNotification } from '../utils/unreadNotification'
import moment from 'moment'

const Notification = () => {
    const [isOpen , setIsOpen] =useState(false)
    const {user} = useContext(AuthContext)
    const {notifications , userChats , allUsers , markAllNotificationRead ,markNotificationAsRead } = useContext(ChatContext)
//    console.log('notification' , notifications)
    const unreadNoti = unreadNotification(notifications)
//    console.log('unread ' , unreadNoti)
    const modiNotifications = notifications.map((n)=>{
        const sender = allUsers.find((user)=> user._id === n.senderId )

        return {
            ...n,
            senderName :sender?.name
        }
    })
//    console.log('modi' , modiNotifications)
  return (
    <div className='notifications'>
        <div className='notifications-icon' onClick={()=> setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        </svg>
        {unreadNoti?.length === 0 ? null : 
            <span className='notification-count'>
            <span>{unreadNoti?.length}</span>
            </span>
        }
        </div>
        {
            !isOpen ? null : 
            <div className="notifications-box">
            <div className="notifications-header">
                <h3>Notification</h3>
                <p className='mark-as-read' onClick={()=>markAllNotificationRead(notifications)}>Mark as read</p>
            </div>
            {modiNotifications?.length === 0 ? 
                <span className='notification' >No notifications</span> : null}
            {modiNotifications && modiNotifications.map((n , index)=>{
                return  <div 
                className={n.isRead ? 'notification' :'notification not-read'}
                key={index}
                onClick={()=>{
                    markNotificationAsRead(n , userChats , user , modiNotifications )
                }}>
                    <span>{`${n.senderName} sent you a message.`}</span>
                    <span className='notification-time'>{moment(n.date).calendar()}</span>
                    </div>
                
            })}
        </div>

        }
      
    </div>
  )
}

export default Notification
