import {useEffect , useState} from 'react'
import { baseUrl, getRequest } from '../utils/services'

export const useFetchRecipient = ({user , chat}) => {
    const [recipientUser ,setRecipientUser] = useState(null)
    const [error , setError] = useState(null)

    const recipientId = chat?.members.find((id)=> id !== user._id)

    useEffect(()=>{
        const getUser = async () =>{
            if (!recipientId) return null
            try{
                const response = await  getRequest(`${baseUrl}/users/find/${recipientId}`)
                if (response.error){
                    return setError(response)
                }
//                console.log(response)
                setRecipientUser(response.user)
            }catch(error){
                console.log(error)
            }    
            }
        getUser()
    } ,[])
    return {recipientUser , error}
}

