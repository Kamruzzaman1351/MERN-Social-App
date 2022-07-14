import React from 'react'
import avatar from "../assets/images/avatar.jpg"
import {Stack} from "react-bootstrap"
const ChatFriend = ({friend, socket, room}) => {  
  const joinRoom = async() => {
    socket.emit("join_room", friend._id)
    room(friend)
  }  
  return (
    <div onClick={joinRoom} className="chatFriend my-2 mx-auto" style={{background: `{ true ? "green" : "blue" }`}}>
        <Stack direction="horizontal" gap={2}>
            <div>
                <img src={friend.img ? friend.img : avatar} alt="user img"/>
            </div>
            <div>
                <h3>{friend.name}</h3>
            </div>
        </Stack>
    </div>
  )
}

export default ChatFriend