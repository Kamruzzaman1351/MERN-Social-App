import React from 'react'
import moment from "moment"

const MessageBody = ({user, message}) => {

  return (    
    <div className={message.author === user.name ? "message" : "message right"}>
        <p className="meta">{message.author === user.name ? "You" : message.author} <span>{moment(message.time).fromNow()}</span></p>
        <p className="text">
            {message.message}
        </p>
    </div>
    
  )
}

export default MessageBody