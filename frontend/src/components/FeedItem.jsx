import React from 'react'
import { Card, Stack, Button } from 'react-bootstrap'
import { deleteFeed, setEditForm } from '../features/feed/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
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
            {feed.img_url && <Card.Img variant="top" src={feed.img_url} height="280px" />}
            <Card.Body>
                <p className='mt-1 pl-1'>Created By: {feed.user_name}</p>
                <Card.Title>{feed.title}</Card.Title>
                <Card.Text>
                    {feed.tags.map(tag => (
                        <span key={tag}>#{tag} </span>
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