import React from 'react'
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import avatar from "../assets/images/avatar.jpg"
const UserProfile = ({user}) => {
  return (
    <div>
        <Card className="text-center">
            <Card.Img className='profileImgDiv' variant="top" src={user.avatar ? user.avatar : avatar} />
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <h5>{user.profession}</h5>
                  <p>{user.phone}</p>
                </Card.Text>
                <Link to="/profile" className='btn btn-primary'>Profile</Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default UserProfile