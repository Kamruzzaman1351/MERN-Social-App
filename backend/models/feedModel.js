const mongoose = require("mongoose")

const feedSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    user_name: {
        type: String,
        require: true,
        ref: "User"
    },
    title: {
        type: String,
        require: [true, "Feed title is require"]
    },
    body: {
        type: String,
        require: true
    },
    img_url: {
        type: String,
    },
    tags: [String],
    like_count: {
        type: Number,
        default: 0
    } 
}, {
    timestamps: true
})

const Feed = mongoose.model("Feed", feedSchema)

module.exports = Feed