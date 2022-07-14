import React, {useEffect, useState} from 'react'
import {FaSmile, FaUsers, FaPaperPlane, FaRegSmileWink, FaSmileWink} from "react-icons/fa"
import { io } from "socket.io-client"
import { getFriends, reset } from '../features/friend/friendSlice'
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import ChatFriend from '../components/ChatFriend'
import Spinner from "../components/shared/Spinner"
import MessageBody from '../components/MessageBody'
import ScrollToBottom from 'react-scroll-to-bottom'
// const socket = io.connect("http://localhost:8000")

const UserChat = () => {
    const [message, setMessage] = useState("")
    const [socket, setSocket] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [room, setRoom] = useState("")
    const dispatch = useDispatch()
    const {allFriends, isError, isLoading, isMessage} = useSelector(state => state.friend)
    const {user} = useSelector(state => state.user)
    useEffect(() => {
        if(isError) {
            toast.error(isMessage, {autoClose:1000})
        }
        dispatch(getFriends())
        dispatch(reset())
    }, [isError, dispatch])

    useEffect(() => {
        if(socket === null){
            setSocket(io("http://localhost:8000"))
        }
        if(socket) {
            socket.on('connect', () => {
                socket.emit('joined', { 'serverchannel': 120 })
            })

            socket.on("old message", (data) => {
                setMessageList(data)
            })
            socket.on("recive_message", (data) => {
                setMessageList(prevState => [...prevState, data])
            })
        }
    }, [socket])

    const onSubmit = async (e) => {
      e.preventDefault()
      if(message !== "") {
        const messageData = {
            author: user.name,
            room: room._id,
            message,
            time: new Date()
        }
        await socket.emit("send_message", messageData)
        setMessageList(prevState => [...prevState, messageData])
        setMessage("")
      }
    }


    if(isLoading) {
        return <Spinner />
    }

    return (
    <div className="chat-container">
        <header className="mx-auto chat-header text-center">
            <h1><FaSmileWink /> <FaSmile /> <FaRegSmileWink /> Chat With {room.name}</h1>
        </header>
        <main className="chat-main">
            <div className="chat-sidebar">
                <h3><FaUsers /> Friend List</h3>
                {allFriends.length > 0 && <>
                    {allFriends.map(friend => (<ChatFriend key={friend.id} friend={friend} socket={socket} room={setRoom} user={user}/>))}
                   
                </>}
            </div>
            <ScrollToBottom className="chat-messages">
                {room && <>
                    {messageList.map((message, index) => (<>
                        {room._id === message.room && <MessageBody key={index} message={message} user={user}/>}
                    </>
                    ))}
                    
                </>}
                
            </ScrollToBottom>
        </main>
        <div className="chat-form-container">
            <form onSubmit={onSubmit}>
                <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    required
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="chatbtn"><FaPaperPlane /> Send</button>
            </form>
        </div>
    </div>
  )
}

export default UserChat