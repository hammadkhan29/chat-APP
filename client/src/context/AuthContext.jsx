import { createContext , useCallback, useEffect, useState } from "react";
import { postRequest , baseUrl } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user , setUser] = useState(null)
    const [isError , setIsError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [registerInfo , setRegisterInfo] =useState({name:'',email:'',password:''})
    const [loginInfo , setLoginInfo] =useState({email:'',password:''})
    const [token , setToken] = useState(null)
    useEffect(()=>{
        const user = localStorage.getItem('user')

        setUser(JSON.parse(user))
        const token = localStorage.getItem('token')
        setToken(token)
    },[])
    const updateRegisterInfo = useCallback((info)=>{setRegisterInfo(info)},[])
    const updateLoginInfo = useCallback((info)=>{setLoginInfo(info)},[])

    const registerUser = useCallback(async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        const registerInfoToSend = registerInfo;
        console.log(registerInfoToSend)
        const res = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfoToSend))
        console.log(res)
        setIsLoading(false)
        if (res.error){
            return setIsError(res)
        }
        localStorage.setItem('user' , JSON.stringify(res.user))
        localStorage.setItem('token',res.token)
        setIsError(null)
        setUser(res.user)
        window.location.reload();
    },[registerInfo])

    const loginUser = useCallback(async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        const res = await postRequest(`${baseUrl}/users/login-user`, JSON.stringify(loginInfo))
        console.log(res)
        setIsLoading(false)
        if (res.error){
            return setIsError(res)
        }
        localStorage.setItem('user' , JSON.stringify(res.user))
        localStorage.setItem('token',res.token)
        setIsError(null)
        setUser(res.user)
        window.location.reload();
    },[loginInfo])


    return <AuthContext.Provider 
    value={{user 
        , registerInfo 
        , updateRegisterInfo 
        , registerUser 
        , isLoading 
        , isError 
        , token 
        , setToken
        , loginInfo
        ,setLoginInfo
        ,loginUser
        ,updateLoginInfo
    }}>
        {children}
    </AuthContext.Provider>
}