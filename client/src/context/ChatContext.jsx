import { createContext , useCallback, useEffect, useState } from "react";
import { getRequest , postRequest, baseUrl } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({children , user}) =>{
    const [userChats , setUserChats] = useState(null)
    const [isError , setIsError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    useEffect(()=>{
        const getUserChats = async () =>{
            if (user?._id){
                setIsLoading(true)
                const response = await getRequest(`${baseUrl}/chats/${user._id}`)
                setIsLoading(false)
                if(response.error){
                    setIsError(response)
                }
                setUserChats(response.chats)
                localStorage.setItem('chats' ,JSON.stringify(response.chats))
    
            }
        }
        getUserChats();
    } , [user])
    return (
        <ChatContext.Provider value={{
            userChats ,
            isError,
            isLoading,
            setUserChats
        }}>
        {children}
        </ChatContext.Provider>   
    )
}