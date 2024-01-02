import { Routes , Route , Navigate , Outlet} from 'react-router-dom'
import Chat from './pages/Chat'
import Registe from './pages/Registe'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { ChatContextProvider } from './context/ChatContext';
import ErrorBoundary from './ErrorBoundary'

const ProtectedRoute = ({token , ...props}) =>{
  return (
    token ? 
    <Navigate replace to='/'/>
    :
    <Outlet/>
  )
}


const App = () => {
  const {user} = useContext(AuthContext)
return (
  <>
    <ErrorBoundary>
    <ChatContextProvider user={user}>
    <Navbar/>
    <Container className=''>
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/login' element={<Login/>}/>      
      <Route path='/register' element={<Registe/>}/>
    </Routes>
    </Container>
    </ChatContextProvider>
    </ErrorBoundary>
    </>
  )
}

export default App
