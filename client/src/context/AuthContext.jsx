import { createContext , useCallback, useEffect, useState } from "react";
import { postRequest , baseUrl } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const navigate = useNavigate()
    const [user , setUser] = useState(null)
    const [isError , setIsError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [registerInfo , setRegisterInfo] =useState({name:'',email:'',password:''})
    const [loginInfo , setLoginInfo] =useState({email:'',password:''})

    //Fetching user from localstorage
    useEffect(()=>{
        const loggedUser = localStorage.getItem('user')
        const parsedUser = JSON.parse(loggedUser);
        setUser(parsedUser);
    },[])

    //handling state change in login and register  
    const updateRegisterInfo = useCallback((info)=>{setRegisterInfo(info)},[])

    const updateLoginInfo = useCallback((info)=>{setLoginInfo(info)},[])

    //handling post request in login and register
    const registerUser = useCallback(async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        const registerInfoToSend = registerInfo;
//        console.log(registerInfoToSend)
        const res = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfoToSend))
//        console.log(res)
        setIsLoading(false)

        if (res.error){
            return setIsError(res)
        }

        localStorage.setItem('user' , JSON.stringify(res.user))

        setIsError(null)
        setUser(res.user)
        navigate('/')
    },[registerInfo])

    const loginUser = useCallback(async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        const res = await postRequest(`${baseUrl}/users/login-user`, JSON.stringify(loginInfo))
//        console.log(res)
        setIsLoading(false)
        if (res.error){
            return setIsError(res)
        }
        localStorage.setItem('user' , JSON.stringify(res.user))
        setIsError(null)
        setUser(res.user)
        navigate('/')
    },[loginInfo])


    return <AuthContext.Provider 
    value={{user 
        , registerInfo 
        , updateRegisterInfo 
        , registerUser 
        , isLoading 
        , isError 
        , loginInfo
        ,setLoginInfo
        ,loginUser
        ,updateLoginInfo
        ,setUser
    }}>
        {children}
    </AuthContext.Provider>
}