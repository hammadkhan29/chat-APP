import { Routes , Route , Navigate} from 'react-router-dom'
import Chat from './pages/Chat'
import Registe from './pages/Registe'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
    <Navbar/>
    <Container className=''>
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registe/>}/>
    </Routes>
    </Container>
    </>
  )
}

export default App
