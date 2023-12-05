import { Routes , Route , Navigate} from 'react-router-dom'
import Chat from './pages/Chat'
import Registe from './pages/Registe'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const App = () => {

  const {user} = useContext(AuthContext)
  return (
    <>
    <Navbar/>
    <Container className=''>
    <Routes>
      <Route path='/' element={user ? <Chat/> : <Login/>}/>
      <Route path='/login' element={user ? <Chat/> : <Login/>}/>
      <Route path='/register' element={user ? <Chat/> : <Registe/>}/>
    </Routes>
    </Container>
    </>
  )
}

export default App
