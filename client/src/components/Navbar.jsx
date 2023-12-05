import React, { useEffect } from 'react'
import {Container , Nav , Navbar , Stack} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
const NavBar = () => {
  const {token , setToken , user } = useContext(AuthContext)

  const handleLogout = () =>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload();
  }
  return (
    <Navbar bg='dark' className='mb-4' style={{height:'3.75rem'}}>
        <Container>
        <h2>
        <Link to='/' className='text-light text-decoration-none'>ChatApp</Link>
        </h2>
        { token? 
          <>
          <span className='text-warning'>Logged in as {user?.name || ''}</span>
          <Nav>
          <Stack direction='horizontal'>
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
