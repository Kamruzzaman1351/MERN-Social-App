import React from 'react'
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import avatar from "../assets/images/avatar.jpg"
import moment from 'moment'
const UserProfile = ({user}) => {
  return (
    <div>
        <Card className="text-center">
            <Card.Img className='profileImgDiv' variant="top" src={user.avatar ? user.avatar : avatar} />
            <Card.Body>
                <h3>{user.name}</h3>
                <h5>{user.profession}</h5>
                <p>{user.email}</p>
                {window.location.pathname === "/feeds" && 
                <Link to="/profile" className='btn btn-primary'>Update Profile</Link>}
                {window.location.pathname === "/profile" && <>
                  <p> Member Since: {moment(user.createdAT).format("DD MMM YYYY")} </p>
                </>
                }
                <Link to="/friend-list" className='btn btn-primary my-3' style={{width:"100%"}}>All Friends</Link>
                <Link to="/chatroom" className='btn btn-info my-3 text-white' style={{width:"100%"}}>Chat Room</Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default UserProfile