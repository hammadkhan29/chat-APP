import React from 'react'
import {Container , Nav , Navbar , Stack} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <Navbar bg='dark' className='mb-4' style={{height:'3.75rem'}}>
        <Container>
        <h2>
        <Link to='/' className='text-light text-decoration-none'>ChatApp</Link>
        </h2>
        <Nav>
        <Stack direction='horizontal'>
        <Link to='/login' className='text-light text-decoration-none m-2'>Login</Link>
        <Link to='/register' className='text-light text-decoration-none m-1'>Register</Link>
        </Stack>
        </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar
