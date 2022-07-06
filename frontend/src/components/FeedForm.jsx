import React, {useState} from 'react'
import {Container, Row, Col, Button, Card} from "react-bootstrap"
import FileBase64 from 'react-file-base64'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createFeed, reset } from '../features/feed/feedSlice'
const FeedForm = () => {
    const dispatch = useDispatch()
    const [formData, setFormdata] = useState({
        title: "",
        tags:"",
        img_url: "",
    })
    const {title, tags, img_url } = formData
    const {isSuccess, isLoading} = useSelector(state => state.feeds)
    const onChange = (e) => {
        setFormdata(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const clearForm = () => {
        setFormdata({
            title: "",
            tags:"",
            img_url: ""
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(!title || !tags || !img_url) {
            toast.error("Please add all inputs", {autoClose:1000})
        } else {
            dispatch(createFeed(formData))
            if(!isLoading && isSuccess) {
                toast.success("New Feed Added", {autoClose:1000})
                clearForm()
                dispatch(reset())
            }
        }
    }

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
                            <form onSubmit={onSubmit}>
                                <div className="form-group my-2">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id='title' 
                                        placeholder='Post Title'
                                        value={title}
                                        onChange={onChange} 
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id='tags' 
                                        placeholder='Tags'
                                        value={tags}
                                        onChange={onChange} 
                                    />
                                    <small>Please put comma after each tag</small>
                                </div>
                                <div className="form-group my-2">
                                    <label className='my-2' htmlFor="img_url">Image</label>
                                    <FileBase64
                                        type="file" 
                                        multiple={ false} 
                                        onDone={({base64})=> setFormdata({...formData, img_url: base64})}
                                    />
                                    <Card.Img className='mt-3' variant="top" src={img_url} />
                                </div>                  
                                <Button className='my-4' type='submit' variant="primary" style={{width: "100%"}}>Create</Button>
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