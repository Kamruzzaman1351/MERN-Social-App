const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    room_id: String,
    msg: String,
    author: String,

}, {
    timestamps: true
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message