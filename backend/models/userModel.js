const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "User Name is require"]
    },
    email: {
        type: String,
        require: [true, "Email is require"],
        unique: [true, "Email allready be used"]
    },
    profession: {
        type: String,
        require: true,
        default: "Web Developer"
    },
    bio: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        require: [true, "Password is require"]
    },
    avater: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    phone: {
        type: Number,
        default: null
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User