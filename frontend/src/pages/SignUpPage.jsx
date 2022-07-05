import React from 'react'
import {Container, Row, Col, Card, Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
const SignUpPage = () => {
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
                <form>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='name'>Your Name</label>
                    <input 
                      className="form-control" 
                      type="name" 
                      id='name' 
                      placeholder='Your Name' 
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='email'>Your Email</label>
                    <input 
                      className="form-control" 
                      type="email" 
                      id='email' 
                      placeholder='Your Email' 
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='password'>Your Password</label>
                    <input 
                      className="form-control" 
                      type="password" 
                      id='password' 
                      placeholder='Your password' 
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className='my-2' htmlFor='password1'>Confirm Password</label>
                    <input 
                      className="form-control" 
                      type="password" 
                      id='password1' 
                      placeholder='Confirm password' 
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