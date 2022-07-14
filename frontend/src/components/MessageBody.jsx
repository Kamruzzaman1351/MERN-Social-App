import React from 'react'
const MessageBody = ({user, message}) => {
  return (
    <div className={message.author === user.name ? "message" : "message right"}>
        <p className="meta">{message.author === user.name ? "You" : message.author} <span>{message.time}</span></p>
        <p className="text">
            {message.message}
        </p>
    </div>
  )
}

export default MessageBody