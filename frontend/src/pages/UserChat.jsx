import React from 'react'
import {FaSmile, FaUsers, FaPaperPlane, FaRegSmileWink, FaSmileWink} from "react-icons/fa"
const UserChat = () => {
  return (
    <div className="chat-container">
        <header className="mx-auto chat-header text-center">
            <h1><FaSmileWink /> <FaSmile /> <FaRegSmileWink /> Chat With your Friends</h1>
        </header>
        <main className="chat-main">
            <div className="chat-sidebar">
                <h3><FaUsers /> Friend List</h3>
                <ul id="users">
                    <li>Brad</li>
                    <li>John</li>
                    <li>Mary</li>
                    <li>Paul</li>
                    <li>Mike</li>
                </ul>
            </div>
            <div className="chat-messages">
                <div className="message">
                    <p className="meta">Brad <span>9:12pm</span></p>
                    <p className="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                        repudiandae.
                    </p>
                </div>
                <div className="message">
                    <p className="meta">Mary <span>9:15pm</span></p>
                    <p className="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                        repudiandae.
                    </p>
                </div>
            </div>
        </main>
        <div className="chat-form-container">
            <form>
                <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    required
                    autoComplete="off"
                />
                <button className="chatbtn"><FaPaperPlane /> Send</button>
            </form>
        </div>
    </div>
  )
}

export default UserChat