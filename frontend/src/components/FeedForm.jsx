import React from 'react'
import {Container, Row, Col, Button, Card} from "react-bootstrap"



const FeedForm = () => {


  return (
    <div className='mx-auto'>
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h2 className='text-center'>Add Post</h2>
                        </Card.Header>
                        <Card.Body>
                            <form>
                                <div className="form-group my-2">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id='title' 
                                        placeholder='Post Title' 
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id='tags' 
                                        placeholder='Tags' 
                                    />
                                    <small>Please put comma after each tag</small>
                                </div>
                                <div className="form-group my-2">
                                    <label className='my-2' htmlFor="img_url">Upload an Image</label>
                                    <input type="file" className="form-control-file" id="img_url" />
                                </div>                  
                                <Button className='my-4' type='submit' variant="primary" style={{width: "100%"}}>Submit</Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default FeedForm