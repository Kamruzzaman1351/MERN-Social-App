import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card, Button} from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, reset } from '../features/auth/userSlice'
import {useDispatch, useSelector} from "react-redux"
import Spinner from '../components/shared/Spinner'
import { toast } from 'react-toastify'
const SignInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const {email, password} = formData
  const {isLoading, isError, isMessage, isSuccess, user} = useSelector(state => state.user)
  useEffect(() => {
    if(isError) {
      toast.error(isMessage, {autoClose:1000})
    }
    dispatch(reset())
    if(user && isSuccess) {
      toast.success("Login Successfully", {autoClose:1000})
      navigate("/feeds")
    }
  }, [isError, dispatch, user, isSuccess])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if(!email || !password) {
      toast.error("User Credential is require", {autoClose:1000})
    }
    dispatch(loginUser(formData))   

  }
  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='mx-auto'>
      <Container>
        <Row>
          <Col className='col-md-6 mx-auto'>
            <Card>
              <Card.Header>
                <h2 className='text-center'>SingIn Form</h2>
              </Card.Header>
              <Card.Body>
                <form onSubmit={onSubmit}>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='email'>Your Email</label>
                    <input 
                      className="form-control" 
                      type="email" 
                      id='email' 
                      placeholder='Your Email'
                      value={email}
                      onChange={onChange} 
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='password'>Your Password</label>
                    <input 
                      className="form-control" 
                      type="password" 
                      id='password' 
                      placeholder='Your password'
                      value={password}
                      onChange={onChange} 
                    />
                  </div>
                  <Button className='my-4' type='submit' variant="primary" style={{width: "100%"}}>Submit</Button>
                </form>
              </Card.Body>
              <Card.Footer className='text-center my-2'>
                <h5>Do not have an Account?</h5>
                <Link to="/signup">SignUp Here</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignInPage