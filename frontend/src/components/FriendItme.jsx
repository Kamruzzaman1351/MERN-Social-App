import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Col} from "react-bootstrap"
import avatar from "../assets/images/avatar.jpg"
import {acceptFriendRequest, reset, getAllFriend} from "../features/friend/friendSlice"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
const FriendItme = ({friend}) => {
  const dispatch = useDispatch()
  const {isError, isMessage } = useSelector(state => state.friend)
  useEffect(() => {
    if(isError) {
      toast.error(isMessage)
    }    
    dispatch(reset())
  }, [dispatch, isError])
  const approvedRequest = () => {
    const data = {
      id: friend._id
    }
    dispatch(acceptFriendRequest(data))
    dispatch(getAllFriend())
    
  }
    return (
        <Col lg="3" md={4} xs="auto" sm={5} className="bg-white mx-1 my-1 userDiv">
          <div className="text-center item-center">
            <img src={friend.avatar ? friend.avatar : avatar} alt="" className="userImgDiv"/>
            <h2>{friend.name}</h2>
            <h5>{friend.profession}</h5>
            
            <div className="my-3">
              <Link style={{borderRadius: "6px", width:"100% !important"}} className="bg-primary py-2 px-2 my-3 text-white" to={`/user/${friend.id}`}>View Profile</Link>
              <p onClick={approvedRequest} style={{cursor: "pointer", borderRadius: "6px", background: `${friend.state ? "green" : "blue"}`}} className="py-2 mt-4 text-white">
                {friend.state ? "Friend" : "Approved Request"}
              </p>
            </div>
          </div>
        </Col>
      )
}

export default FriendItme