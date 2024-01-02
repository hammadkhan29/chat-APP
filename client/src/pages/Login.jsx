import {useContext} from 'react'
import {Alert , Button , Row ,Col, Stack, Form} from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import LoadingSpinner from '../components/Spinner'

const Login = () => {
  const {loginInfo , updateLoginInfo , loginUser , isLoading,isError} = useContext(AuthContext)
  
  return (
    <>
    <Form onSubmit={loginUser}>

    <Row style={{height:'100vh' , justifyContent:'center' , paddingTop:'10%'}}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{textAlign:'center'}}>Login</h2>
            <Form.Control className='m-3' type='email' placeholder='Email'
            onChange={(e)=>{updateLoginInfo({...loginInfo,email:e.target.value})}}/>
            <Form.Control className='m-3' type='password' placeholder='Password'
            onChange={(e)=>{updateLoginInfo({...loginInfo,password:e.target.value})}}/>

            <Button style={{width:'150px' , height:'40px'}} variant='primary' type='submit' className='m-3'>
            {isLoading? <LoadingSpinner/>: <p>Login</p>}
            </Button>

            {
              isError?.error &&(
              <Alert style={{height:'30px' , textAlign:'left',padding:'3px'}} variant='danger' className='m-3'><p>{isError.message}</p></Alert>
              )
            }
          </Stack>
        </Col>
      </Row>
    </Form>  
    </>
  )
}

export default Login
