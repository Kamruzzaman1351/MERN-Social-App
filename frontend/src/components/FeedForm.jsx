import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Button, Card} from "react-bootstrap"
import FileBase64 from 'react-file-base64'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createFeed, reset, unSetEditForm, updateFeed } from '../features/feed/feedSlice'
const FeedForm = ({feed}) => {
    const dispatch = useDispatch()
    const {isSuccess, isLoading, editForm} = useSelector(state => state.feeds)
    const [formData, setFormdata] = useState({
        title: "",
        tags: "",
        img_url: "",
    })
    const {title, tags, img_url } = formData
    useEffect(() => {
        if(editForm) {
            setFormdata(feed)
        }
    }, [editForm, isSuccess])
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
    const onUpdate = (e) => {
        e.preventDefault()
        if(feed.title === title && feed.tags === tags && feed.img_url === img_url) {
            toast.error("You did not change anythig", {autoClose:1000})
        } else {
            const data = {
                id: feed._id,
                formData
            }
            dispatch(updateFeed(data))
            dispatch(unSetEditForm())
            clearForm()
            toast.success("Feed Updated", {autoClose:1000})
        }
    }

  return (
    <div className='mx-auto'>
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h2 className='text-center'>{editForm ? "Update Feed" : "Create Feed"}</h2>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={editForm ? onUpdate : onSubmit}>
                                <div className="form-group my-2">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id='title' 
                                        placeholder= "Post Title"
                                        value={title}
                                        onChange={onChange} 
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id='tags' 
                                        placeholder="Tags"
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
                                    <Card.Img className='mt-3' variant="top" src={ img_url} />
                                </div>                  
                                <Button className='my-4' type='submit' variant="primary" style={{width: "100%"}}>{editForm ? "Update" : "Create"}</Button>
                            </form>
                                {editForm && <Button 
                                    className='mb-4' 
                                    variant="danger" 
                                    style={{width: "100%"}}
                                    onClick={() => dispatch(unSetEditForm())} 
                                    >Close</Button>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default FeedForm