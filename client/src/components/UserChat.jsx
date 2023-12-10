import React, { useContext } from 'react'
import { useFetchRecipient } from '../hooks/useFetchRecipient'
import { Stack } from 'react-bootstrap'
import Avatar from '../assets/avatar.svg'
import { ChatContext } from '../context/ChatContext'

const UserChat = ({chat , user}) => {
    const {recipientUser} = useFetchRecipient({chat , user})
//    console.log(recipientUser)
    const {onlineUser} = useContext(ChatContext)
    const isOnline = onlineUser?.some((user)=> user?.userId === recipientUser?._id )
    console.log('isOnline' , isOnline)
  return (
    <Stack className='d-flex user-card align-items-center p-2 justify-content-between'>
    <div className='d-flex'>
        <div className='mr-2'>
        <img src={Avatar} height='35px'/>
        </div>
        <div className='text-content'>
            <div className='name'>
                {recipientUser?.name}
            </div>
            <div className='text'>
                Text Message
            </div>
        </div>
    </div>
    <div className='d-flex flex-column align-items-end'>
        <div className="date">12-12-2023</div>
        <div className="this-user-notifications">2</div>
        <div className={isOnline ? "user-online" : ''}></div>
    </div>
    </Stack>
  )
}

export default UserChat
