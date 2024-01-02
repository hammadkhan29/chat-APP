import {useContext} from 'react'
import { ChatContext } from '../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
import UserChat from '../components/UserChat'
import { AuthContext } from '../context/AuthContext'
import PotentialChat from '../components/PotentialChat'
import ChatBox from '../components/ChatBox'
import LoadingSpinner from '../components/Spinner'

const Chat = () => {
  const {user} = useContext(AuthContext)

  const {userChats  , isLoading  , updateCurrentChat , currentChat} = useContext(ChatContext)

//  console.log('Chat' , userChats)

  return (
      <>
      <Container>
      <PotentialChat/>
      {userChats?.length <1 ? null :
      <Stack className='d-flex align-items-start'>
      <Stack className='messages-box mr-3 p-3'>
        {isLoading && <LoadingSpinner/>}
        {userChats?.map((chat , index)=>{
          return (
            <div key={index} onClick={()=>updateCurrentChat(chat)}>
              <UserChat chat={chat} user={user}></UserChat>
            </div>
          )
        })

        }
      </Stack>
      { currentChat ?
        <Stack className='d-flex align-items-center justify-content-center' style={{width:'100%',height:'100%'}}>
        <ChatBox/>
      </Stack> 
      :
      <Stack className='d-flex align-items-center justify-content-center' style={{width:'100%',height:'100%'}}>
      <h4>No conversation yet</h4>
      </Stack> 
      }
      </Stack>
     }
      </Container>
      </>
  )
}

export default Chat



