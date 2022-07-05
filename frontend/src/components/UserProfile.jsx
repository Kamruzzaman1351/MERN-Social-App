import React from 'react'
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
const UserProfile = () => {
  return (
    <div>
        <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>User Name</Card.Title>
                <Card.Text>
                    User Bio
                </Card.Text>
                <Link to="/profile" className='btn btn-primary'>Profile</Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default UserProfile