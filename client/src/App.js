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

const ProtectedRoute = ({token , ...props}) =>{
  return (
    token ? 
    <Navigate replace to='/'/>
    :
    <Outlet/>
  )
}
const App = () => {
  const token = localStorage.getItem('token')
  const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
    <Navbar/>
    <Container className=''>
    <Routes>
      <Route path='/' element={<Chat/>}/>

      <Route path='/login' element={<ProtectedRoute token={token}/>}>
        <Route path='/login' element={<Login/>}/>      
      </Route>

      <Route path='/register' element={<ProtectedRoute token={token}/>}>
        <Route path='/register' element={<Registe/>}/>
      </Route>
    </Routes>
    </Container>
    </ChatContextProvider>
  )
}

export default App
