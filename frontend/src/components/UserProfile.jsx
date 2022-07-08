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
                <h3>{user.name}</h3>
                <h5>{user.profession}</h5>
                <p>{user.phone}</p>
                <Link to="/profile" className='btn btn-primary'>Profile</Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default UserProfile