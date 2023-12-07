import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

const PotentialChat = () => {
    const {user} = useContext(AuthContext)
    const {potentialUser , createChat , userChats} = useContext(ChatContext)
  return (
    <>
    <div className="all-users">
    {potentialUser && potentialUser.map((u ,index)=>{
        return (
            <div className="single-user" key={index} onClick={()=>createChat(user?._id ,u?._id)}>
            {u?.name}
            <span className="user-online"></span>
            </div>
        )
    })}
    </div>
    </>
  )
}

export default PotentialChat
