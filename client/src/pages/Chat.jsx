import {useContext} from 'react'
import { ChatContext } from '../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'

const Chat = () => {
  const {userChats , isError , isLoading , setUserChats} = useContext(ChatContext)
  console.log(userChats)
  return (
    <>
     {isLoading? <h4>Chats are loading......</h4> :
      <>
      <Container>
      {userChats?.length <1 ? null :
      <Stack>
      <Stack>List</Stack>
      <p>Chat box</p>

      </Stack>
     }
      </Container>
      </>
    } 
    </>
  )
}

export default Chat
