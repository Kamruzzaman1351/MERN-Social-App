import React from 'react'
import { Card, Stack, Button } from 'react-bootstrap'
const FeedItem = ({feed}) => {
  return (
    <div className='my-4'>
        <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
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
                    <div className='ms-auto'>
                        <Button variant="info">Edit</Button>
                    </div>
                    <div>
                        <Button variant="danger">Delete</Button>
                    </div>
                </Stack> 
            </Card.Footer>
        </Card>
    </div>
  )
}

export default FeedItem