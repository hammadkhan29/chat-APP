import { createContext , useCallback, useEffect, useState } from "react";
import { getRequest , postRequest, baseUrl } from "../utils/services";

export const ChatContext = createContext()
export const ChatContextProvider = ({children , user}) =>{
    const [userChats , setUserChats] = useState(null)
    const [isError , setIsError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [potentialUser , setPotentialUser] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState(null)
    const [newMessage , setNewMessage] = useState(null)

    // useEffect for updating userChats state

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
    } , [user])

    //useEffect for user chats ended here

    //Debugged and console statements added
    
    useEffect(()=>{
        const getUsers = async () =>{
            const response = await getRequest(`${baseUrl}/users/get-users`)
            console.log('getUsers' , response)
            if (response.error) return setIsError(response)

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
    //UseEffect for getting potential users have ended here

    //Triggered when current chat is updated 
    useEffect(()=>{
        const getMessages = async () =>{
                const chatID = currentChat?._id
                console.log('inside getmessage' , chatID)
                setIsLoading(true)
                const response = await getRequest(`${baseUrl}/messages/${chatID}`)
                setIsLoading(false)
                if(response.error){
                    console.log('inside get message error' , response.error)
                    setIsError(response)
                }
                console.log('getting messages' , response.data)
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
    //create chat is ended here

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
            sendTextMessage

        }}>
        {children}
        </ChatContext.Provider>   
    )
}