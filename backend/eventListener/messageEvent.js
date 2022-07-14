const messageHandler = (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data)
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recive_message", data)
    })
    socket.on("disconnect", () => {
        
    })
}

module.exports = messageHandler