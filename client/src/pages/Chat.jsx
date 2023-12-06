import {useContext} from 'react'
import { ChatContext } from '../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
import UserChat from '../components/UserChat'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const {user} = useContext(AuthContext)
  const {userChats , isError , isLoading , setUserChats} = useContext(ChatContext)
  console.log(userChats)
  return (
      <>
      <Container>
      {userChats?.length <1 ? null :
      <Stack className='d-flex align-items-start'>
      <Stack className='messages-box mr-3 p-3'>
        {isLoading && <p>Loading chats...</p>}
        {userChats?.map((chat , index)=>{
          return (
            <div key={index}>
              <UserChat chat={chat} user={user}></UserChat>
            </div>
          )
        })

        }
      </Stack>
      <Stack>
        <p>Chat box</p>
      </Stack>
      </Stack>
     }
      </Container>
      </>
  )
}

export default Chat
