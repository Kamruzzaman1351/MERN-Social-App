import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card, Button} from "react-bootstrap"
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import { registerUser, reset} from "../features/auth/userSlice"
import { toast } from 'react-toastify'
import Spinner from '../components/shared/Spinner'


const SignUpPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  })
  const {name, email, password, password1} = formData
  const {isLoading, isError, isSuccess, isMessage, user} = useSelector(state => state.user)
  useEffect(() => {
    if(isError) {
      toast.error(isMessage, {autoClose:1500})
    }
    if(user && isSuccess) {
      navigate("/feeds")
      toast.success("Registration Complete", {autoClose:1000})
    }
    dispatch(reset())
  }, [isError, isSuccess, user, dispatch, isMessage])
  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(!name || !email || !password || !password1) {
      toast.error("Please fill all inputs", {autoClose:1000})
    } else if(password !== password1) {
      toast.error("Password does not match", {autoClose:1000})
    } else {
      const copyformData = {
        name,
        email,
        password
      }
      dispatch(registerUser(copyformData))
    }

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
                <h2 className='text-center'>Registration Form</h2>
              </Card.Header>
              <Card.Body>
                <form onSubmit={onSubmit}>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='name'>Your Name</label>
                    <input 
                      className="form-control" 
                      type="name" 
                      id='name' 
                      placeholder='Your Name'
                      value={name}
                      onChange={onChange} 
                    />
                  </div>
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
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='password1'>Confirm Password</label>
                    <input 
                      className="form-control" 
                      type="password" 
                      id='password1' 
                      placeholder='Confirm password'
                      value={password1}
                      onChange={onChange} 
                    />
                  </div>
                  <Button className='my-4' type='submit' variant="primary" style={{width: "100%"}}>Submit</Button>
                </form>
              </Card.Body>
              <Card.Footer className='text-center my-2'>
                <h5>Already have an Account?</h5>
                <Link to="/signin">SignIn Here</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignUpPage