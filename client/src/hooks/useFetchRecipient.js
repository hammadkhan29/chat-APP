import {useEffect , useState} from 'react'
import { baseUrl, getRequest } from '../utils/services'

export const useFetchRecipient = ({chat , user}) => {
    const [recipientUser ,setRecipientUser] = useState(null)
    const [error , setError] = useState(null)

    const recipientId = chat?.members.find((id)=> id !== user._id)

    useEffect(()=>{
        const getUser = async () =>{
            if (!recipientId) return null
            try{
                console.log('hello')
                const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)
                if (response.error){
                    return setError(response)
                }
                localStorage.setItem('recipient' , JSON.stringify(response.user))
                console.log(response.user)
                setRecipientUser(response.user)
            }catch(error){
                console.log(error)
            }    
            }
        getUser()
    } ,[recipientId])

    useEffect(() => {
        console.log(recipientUser);
      }, [recipientUser]);
    
    return {recipientUser , error}
}

