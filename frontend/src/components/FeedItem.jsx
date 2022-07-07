import React from 'react'
import { Card, Stack, Button, Badge } from 'react-bootstrap'
import { deleteFeed, setEditForm } from '../features/feed/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import avatar from "../assets/images/avatar.jpg"
import moment from "moment"
const FeedItem = ({feed, setFeed}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const handleClick = () => {
        if(window.confirm("Are Your Sure?")) {
            dispatch(deleteFeed(feed._id))
        }
    }
    const onEdit = () => {
        dispatch(setEditForm())
        setFeed(feed)
    }
  return (
    <div className='my-4'>
        <Card>
            <Card.Header>
                <Stack direction='horizontal'>
                    <div>
                        <Card.Img className="feedUserImg" src={avatar}/>
                    </div>
                    <div>
                        <h5 className='feedUserName'>{feed.user_name}</h5>
                        <div className='feedUserInfo'>
                            <p>Web Develoer <br/> {moment(feed.createdAt).fromNow()} </p>
                        </div>
                    </div>
                    <div className='ms-auto'>
                       ...
                    </div>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Card.Title>{feed.title}</Card.Title>
                <p>{feed.body}</p>
                {feed.img_url && <Card.Img className='p-2' src={feed.img_url} height="280px" />}
                <Card.Text>
                    {feed.tags.map(tag => (
                        <Badge bg="info" className="mx-1" key={tag}>#{tag} </Badge>
                    ))}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={3}>
                    <div>
                        <Button variant="success">
                            Likes: {feed.like_count}
                        </Button>
                    </div>
                    {(user.id.toString() === feed.user_id.toString()) && <>
                        <div className='ms-auto'>
                            <Button variant="info" onClick={onEdit}>Edit</Button>
                        </div>
                        <div>
                            <Button variant="danger" onClick={handleClick}>Delete</Button>
                        </div>
                    </> }
                </Stack> 
            </Card.Footer>
        </Card>
    </div>
  )
}

export default FeedItem