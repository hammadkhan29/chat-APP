import React from 'react'
import {Container , Nav , Navbar , Stack} from 'react-bootstrap'
import { Link , useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
//import Notification from './Notification'

const NavBar = () => {

  const { user , setUser } = useContext(AuthContext)
//  console.log('checking login',user)
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <Navbar bg='dark' className='mb-4' style={{height:'3.75rem'}}>
        <Container>
        <h2>
        <Link to='/' className='text-light text-decoration-none'>ChatApp</Link>
        </h2>
        { user? 
          <>
          <span className='text-warning'>Logged in as {user?.name || ''}</span>
          <Nav>
          <Stack direction='horizontal' className='d-flex align-items-center'>
{/*          <Notification className='m-2'/> */}
          <Link onClick={handleLogout} to='/login' className='text-light text-decoration-none m-2'>Logout</Link>
          </Stack>
          </Nav>
          </>
          :
          <>
          <Nav>
          <Stack direction='horizontal'>
          <Link to='/login' className='text-light text-decoration-none m-2'>Login</Link>
          <Link to='/register' className='text-light text-decoration-none m-1'>Register</Link>
          </Stack>
          </Nav>
          </>
  
        }
        </Container>
    </Navbar>
  )
}

export default NavBar
