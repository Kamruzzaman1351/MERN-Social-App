import React from 'react'
import { Card } from 'react-bootstrap'
const FeedItem = () => {
  return (
    <div>
        <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>Feed Title</Card.Title>
                <Card.Text>
                    Feed Tags
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                Likes
            </Card.Footer>
        </Card>
    </div>
  )
}

export default FeedItem