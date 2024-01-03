import { ChatContext } from "../context/ChatContext";
import { baseUrl ,  getRequest } from "../utils/services";
import  { useContext, useEffect, useState } from 'react'

export const useFetchLatestMessage = (chat) => {
    console.log('chat',chat)
    const {newMessage , notifications } = useContext(ChatContext)
    const [latestMessage , setLatestMessage] = useState(null)
    console.log('new message' , newMessage)
    console.log('notifications' , notifications)
    useEffect(()=>{
        const getMessages = async () =>{
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`)
            console.log('response' , response.data.length)
            if(response.error){
                return console.log('error here')
            }
            const lastMessage = response.data[response.data.length - 1]
            console.log('last message',lastMessage)
            setLatestMessage(lastMessage)
        }
        getMessages()
    }
    ,[newMessage , notifications])

    return {latestMessage}

}
