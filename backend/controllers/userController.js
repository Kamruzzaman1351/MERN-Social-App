const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const User = require("../models/userModel")

// @desc Login User
// @method POST /api/users/login
// @Oaccess Open 
const userLogin = asyncHandler( async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error("Login Credential require")
    }
    const user = await User.findOne({email})
    if(!user) {
        res.status(400)
        throw new Error("User does not exist")
    } 
    if(await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            id: user._id,
            token: createToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Wrong password")

    }
})

// @desc User Signup
// @route POST /api/users/signup
// @access Open
const userSignup = asyncHandler( async(req, res) => {
    const {name, email, password, profession} = req.body
    if(!name || !email || !password || !profession) {
        res.status(400)
        throw new Error("Please provide all credentials")
    }
    // Check if user exist 
    const userExist = await User.findOne({email})
    if(userExist) {
        res.status(400)
        throw new Error("User Alresdy exist")
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    // Create User
    const user = await User.create({
        name,
        email,
        profession,
        password: hashPassword
    })

    res.status(200).json({
        name: user.name,
        email: user.email,
        profession: user.profession,
        id: user._id,
        token: createToken(user._id)
    })
})



// Create Web Token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn:"120d"})
}
module.exports = {
    userLogin,
    userSignup
}