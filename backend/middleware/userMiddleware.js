const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")


const userProtect = asyncHandler( async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = await User.findById(decode.id).select("-password -avater -address -phone")
        next()
    } else {
        res.status(400)
        throw new Error("Authorization Require")
    }
})

module.exports = userProtect