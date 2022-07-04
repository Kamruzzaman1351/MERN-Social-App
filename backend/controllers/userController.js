const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const User = require("../models/userModel")
const { use } = require("../routers/userRouters")

// @desc Login User
// @method POST /api/users/login
// @Oaccess Open 
const userLogin = asyncHandler( async(req, res) => {
    if(!req.body.text) {
        res.status(401)
        throw new Error("Body is missing")
    }
    // res.json({
    //     "message": "Sign In working"
    // })
})

// @desc User Signup
// @route POST /api/users/register
// @access Open
const userSignup = asyncHandler( async(req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
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
        password: hashPassword
    })

    res.status(200).json({
        name: user.name,
        email: user.email,
        token: createToken(user._id)
    })
})



// Create Web Token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn:90})
}
module.exports = {
    userLogin,
    userSignup
}