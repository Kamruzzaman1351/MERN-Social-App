const mongoose = require("mongoose")

const userFriendSchema = mongoose.Schema({
    source_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    target_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    status: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const UserFriend = mongoose.model("UserFriend", userFriendSchema)

module.exports = UserFriend