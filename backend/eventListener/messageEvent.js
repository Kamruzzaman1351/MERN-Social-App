const Message = require("../models/messageModel")
const messageHandler = (socket) => {
    socket.on("join_room", async(data) => {
        const oldMsg = await Message.find({room_id: data})
        const oldData = oldMsg.map(data => {
            return {
                author: data.author,
                room: data.room_id,
                message: data.msg,
                time: data.createdAt
            }
        })
        await socket.emit("old message", oldData)
        await socket.join(data)
    })
    socket.on("send_message", async(data) => {
        socket.to(data.room).emit("recive_message", data)
        await Message.create({
            room_id: data.room,
            msg: data.message,
            author: data.author
        })
    })
    socket.on("disconnect", () => {
        
    })
}

module.exports = messageHandler