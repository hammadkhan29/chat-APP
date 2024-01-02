import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Notification = () => {
    const [isOpen , setIsOpen] =useState(false)
    const {user} = useContext(AuthContext)
    const {notifications , userChats , allUsers } = useContext(ChatContext)
    console.log('new noti',notifications)
  return (
    <div className='notifications'>
        <div className='notifications-icon' onClick={()=> setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        </svg>
        </div>
        {
            !isOpen ? null : 
            <div className="notifications-box">
            <div className="notifications-header">
                <h3>Notification</h3>
                <p className='mark-as-read'>Mark as read</p>
            </div>
        </div>

        }
      
    </div>
  )
}

export default Notification
