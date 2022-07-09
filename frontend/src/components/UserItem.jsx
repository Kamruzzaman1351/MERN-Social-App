import React from 'react'
import {Col,Button} from "react-bootstrap"
import avatar from "../assets/images/avatar.jpg"
const UserItem = ({user}) => {
  return (
    <Col lg="2" md={3} xs="auto" sm={5} className="bg-white mx-1 my-1 userDiv">
      <div className="text-center item-center">
        <img src={user.avatar ? user.avatar : avatar} alt="" className="userImgDiv"/>
        <h2>{user.name}</h2>
        <h5>{user.professions}</h5>
        <Button>Add Frind</Button>
      </div>
    </Col>
  )
}

export default UserItem