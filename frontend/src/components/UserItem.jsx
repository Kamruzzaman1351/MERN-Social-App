import React, {useEffect} from 'react'
import {Col,Button} from "react-bootstrap"
import avatar from "../assets/images/avatar.jpg"
import {Link} from "react-router-dom"
import { sendFriendRequest, reset } from '../features/friend/friendSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


const UserItem = ({user}) => {
  const dispatch = useDispatch()
  const {isError, isMessage} = useSelector(state => state.friend)
  useEffect(() => {
    if(isError) {
      toast.error(isMessage, {autoClose:1000})
    }
    dispatch(reset())
  },[isError, dispatch])

  const sendRequest = () => {
    const data = {
      id: user._id
    }
    dispatch(sendFriendRequest(data))
    toast.success("Request Send", {autoClose:1000})
  }

  return (
    <Col lg="2" md={3} xs="auto" sm={5} className="bg-white mx-1 my-1 userDiv">
      <div className="text-center item-center">
        <img src={user.avatar ? user.avatar : avatar} alt="" className="userImgDiv"/>
        <h2>{user.name}</h2>
        <h5>{user.professions}</h5>
        <div className="my-3">
          <Link style={{borderRadius: "6px"}} className="bg-primary py-2 px-2 text-white" to={`/user/${user._id}`}>View Profile</Link>
        </div>
        <Button onClick={sendRequest}>Add Frind</Button>
      </div>
    </Col>
  )
}

export default UserItem