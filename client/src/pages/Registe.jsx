import {useContext} from 'react'
import {Alert , Button , Row ,Col, Stack, Form} from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
const Registe = () => {
  const {registerInfo , updateRegisterInfo , registerUser , isLoading
  ,isError} = useContext(AuthContext)
  return (
    <>
    <Form onSubmit={registerUser}>
      <Row style={{height:'100vh' , justifyContent:'center' , paddingTop:'10%'}}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{textAlign:'center'}}>Register</h2>
            <Form.Control className='m-3' type='text' placeholder='Name'
            onChange={(e)=>{updateRegisterInfo({...registerInfo,name:e.target.value})}}/>
            <Form.Control className='m-3' type='email' placeholder='Email'
            onChange={(e)=>{updateRegisterInfo({...registerInfo,email:e.target.value})}}/>
            <Form.Control className='m-3' type='password' placeholder='Password'
            onChange={(e)=>{updateRegisterInfo({...registerInfo,password:e.target.value})}}/>

            <Button variant='primary' type='submit' className='m-3'>
            {isLoading? <p>Creating user</p>: <p>Register</p>}
            </Button>
            {
              isError?.error &&(
              <Alert variant='danger' className='m-2'><p>{isError.message}</p></Alert>
  )}
          </Stack>
        </Col>
      </Row>
    </Form>        
    </>
  )
}

export default Registe
