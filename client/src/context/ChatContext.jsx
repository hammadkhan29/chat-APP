import { createContext , useCallback, useEffect, useState } from "react";
import { getRequest , postRequest, baseUrl } from "../utils/services";
import {io} from 'socket.io-client';

export const ChatContext = createContext()
export const ChatContextProvider = ({children , user}) =>{
    const [isError , setIsError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    
    const [potentialUser , setPotentialUser] = useState([])

    const [userChats , setUserChats] = useState(null)
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState(null)
    const [newMessage , setNewMessage] = useState(null)
    const [socket , setSocket] = useState(null)
    const [onlineUser , setOnlineUser] = useState([])
    const [notifications , setMotification] = useState([])
    const [allUsers , setAllUsers] = useState([])

    //useEffect for socket connection
    useEffect(()=>{
        const newSocket= io("http://localhost:4000")
        setSocket(newSocket)
//        console.log('socket here',newSocket)

        return ()=>{
            newSocket.disconnect()
        }
    },[user])

    //emit a new event from socket
    useEffect(()=>{
        if (socket === null) return 
        socket.emit('addNewUser' , user?._id)

        socket.on('getOnlineUser', (res)=>{
            setOnlineUser(res)
        })

        return () => {
            socket.off('getOnlineUser')
        }
    } ,[socket])
    // useEffect for updating userChats state

    //send message
    useEffect(()=>{
        if (socket === null) return 
        const recipientId = currentChat?.members.find((id)=> id !== user._id)
        socket.emit("sendMessage" , {...newMessage , recipientId})
    } ,[newMessage])

    // receieve message
    useEffect(()=>{
        if (socket === null) return 

        socket.on("getMessage" , res => {
            if (currentChat?._id !== res.chatId) return 

            setMessages(prev => [...prev , res])
        })
        socket.on("getNotification" , res => {
            const isChatOpen = currentChat?.members.some(id=> id === res.senderId)
            if (isChatOpen){
                setMotification(prev => [{...res , isRead : true} , ...prev])
            }else{
                setMotification(prev => [res , ...prev])
            }
        })

        return ()=>{
            socket.off("getMessage")
            socket.off("getNotification")
        }
    } , [socket , currentChat])


    //useEffect for userChats ended here
    useEffect(()=>{
        const getUserChats = async () =>{
            if (user?._id){
//                console.log('userChats getting' , user)
                setIsLoading(true)
                const response = await getRequest(`${baseUrl}/chats/${user._id}`)
                setIsLoading(false)
                if(response.error){
//                    console.log('Error in get user chats' , response.error)
                    setIsError(response)
                }
//              console.log('getting chats' ,response)
                setUserChats(response.chats)   
            }
        }
        getUserChats();
    } , [user , notifications])

    //UseEffect for getting potentialUsers  
    useEffect(()=>{
        const getUsers = async () =>{
            const response = await getRequest(`${baseUrl}/users/get-users`)
//            console.log('getUsers' , response)
            if (response.error) return setIsError(response)
            setAllUsers(response.user)
            const pChats = response.user?.filter((u)=>{
                if (user?._id === u?._id) {
//                    console.log('Same ID')
                    return false
                }
                let isChatExist = false;
                if (userChats){
//                    console.log('User chats inside getUsers' , userChats)
                    isChatExist = userChats.some((chat)=>{
                        return chat?.members[0] === u._id || chat?.members[1] === u._id
                    })
//                    console.log('Check User' , isChatExist)
                }
                return !isChatExist
            })
//            console.log('pchats' , pChats)
            setPotentialUser(pChats)

        }
        getUsers()
    },[userChats , user])
  
    //useEffect when currentChat is updated 
    useEffect(()=>{
        const getMessages = async () =>{
                const chatID = currentChat?._id
//                console.log('inside getmessage' , chatID)
                setIsLoading(true)
                const response = await getRequest(`${baseUrl}/messages/${chatID}`)
                setIsLoading(false)
                if(response.error){
//                    console.log('inside get message error' , response.error)
                    setIsError(response)
                }
//                console.log('getting messages' , response.data)
                setMessages(response.data)
    
            }
        getMessages();
    } , [currentChat])

    //Sending message
    const sendTextMessage = useCallback(async (textMessage , sender , currentChatId , setTextMessage)=>{
        console.log(textMessage)
        if (!textMessage) return console.log('Type something ...')
        setIsLoading(true)
        const response = await postRequest(`${baseUrl}/messages/` , JSON.stringify({
            chatId: currentChatId ,
            senderId: sender._id ,
            text : textMessage
        }))
        setIsLoading(false)
        if (response.error){
            console.log('here error' , response)
            return setIsError(response)
        }
        setNewMessage(response.data)
        setMessages((prev)=> prev ? [...prev , response.data] : [response.data])
        setTextMessage('')
    } , [])

    //Updating current chat 
    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
    },[])

    //Function is triggered when user click on potential chat    
    const createChat = useCallback(async(firstId , secondId)=>{
        const response = await postRequest(`${baseUrl}/chats` , 
        JSON.stringify({firstId , secondId}))
        if (response.error){
//            console.log('create chat error msg', response.error)
            return setIsError(response)
        }
//        console.log('createChat user chats' , userChats)
        setUserChats((prev) => (prev ? [...prev, response.chat] : [response.chat]));

    },[])

    const markAllNotificationRead = useCallback((notifications)=>{
        const mNotifications = notifications.map((n)=>{
            return {...n , isRead : true}
        })

        setMotification(mNotifications)
    } , [])

    const markNotificationAsRead = useCallback((n , userChats , user , notifications)=>{
        //find chat to open
        const desiredChat = userChats.find((chat)=>{
            const chatMembers = [user._id , n.senderId]

            const isDesiredChat = chat?.members.every((member)=>{
                return chatMembers.includes(member)
            })
            return isDesiredChat
        })
        //mark notification as done
        const mNotification = notifications.map((n1)=>{
            if (n.senderId === n1.senderId){
                return {...n,isRead:true}
            }else{
                return n1
            }
        })
        updateCurrentChat(desiredChat)
        setMotification(mNotification)
    }
    ,[])

    const markThisUserNotificationAsRead = useCallback(
        (thisUserNotifications , notifications)=>{
            const modiNotification = notifications.map((n1)=>{
                let notification;

                thisUserNotifications.forEach((n)=>{
                    if (n.senderId == n1.senderId){
                        notification = {...n , isRead:true}
                    }else{
                        notification = n1
                    }
                })

                return notification
            })
            setMotification(modiNotification)
        }
    ,[])

    return (
        <ChatContext.Provider value={{
            userChats ,
            isError,
            isLoading,
            setUserChats,
            potentialUser,
            createChat ,
            updateCurrentChat,
            currentChat,
            messages ,
            sendTextMessage,
            onlineUser,
            notifications,
            allUsers,
            markAllNotificationRead,
            markNotificationAsRead,
            markThisUserNotificationAsRead,
            newMessage
        }}>
        {children}
        </ChatContext.Provider>   
    )
}