import React from 'react'
import { Link } from 'react-router-dom'
import {Col} from "react-bootstrap"
import avatar from "../assets/images/avatar.jpg"
const FriendList = ({friend}) => {
  return (
    <Col lg="3" md={4} xs="auto" sm={5} className="bg-white mx-1 my-1 userDiv">
      <div className="text-center item-center">
        <img src={friend.avatar ? friend.avatar : avatar} alt="" className="userImgDiv"/>
        <h2>{friend.name}</h2>
        <h5>{friend.profession}</h5>
        
        <div className="my-3">
          <Link style={{borderRadius: "6px", width:"100% !important"}} className="bg-primary py-2 px-2 my-3 text-white" to={`/user/${friend.id}`}>View Profile</Link>
          <p style={{borderRadius: "6px", background: `${friend.state ? "green" : "coral"}`}} className="py-2 mt-4 text-white">
            {friend.state ? "Friend" : "Request Pending"}
          </p>
        </div>
      </div>
    </Col>
  )
}

export default FriendList