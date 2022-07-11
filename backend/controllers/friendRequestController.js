const asyncHandler = require("express-async-handler")
const UserFriend = require("../models/userFriendModel.js")
const User = require("../models/userModel.js")


// @desc Send Friend Request
// @route POST /api/users/request
// @access User
const sendFriendRequest = asyncHandler(async (req, res) => {
    const {id} = req.body
    if(!req.user) {
        res.status(400)
        throw new Error("You are not Authorized")
    }
    const user = await User.findById(id)
    if(!user) {
        res.status(400)
        throw new Error("User does not exist")
    }
    const frndRequest = await UserFriend.findOne({source_id: req.user.id, target_id: req.body.id})
    const resiveRequest = await UserFriend.findOne({source_id: req.body.id, target_id: req.user.id})
    if(frndRequest || resiveRequest) {
        res.status(400)
        throw new Error("Request allready send")
    } else {
        const userRequest = await UserFriend.create({
            source_id: req.user.id,
            target_id: req.body.id,
            note: "Pending Request"
        })
        res.status(200).json(userRequest)
    }
})

// @desc Get All Friends
// @route Get /api/users/friends
// @access User
const getAllFriends = asyncHandler( async (req,res) => {
    if(!req.user) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    const friendList = await UserFriend.find({source_id: req.user.id, status:true})
    const sourceUser = friendList.map(async(userRequest) => {
        return await User.findById({_id: userRequest.target_id}).select("-password -bio -address -phone")
    })
    const users = await Promise.all(sourceUser)
    res.status(200).json(users)
})

// @desc Get All Pending Friends
// @route Get /api/users/pending-friends
// @access User
const getAllPendingFriend = asyncHandler( async (req,res) => {
    if(!req.user) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    const friendList = await UserFriend.find({source_id: req.user.id, status:false})
    const sourceUser = friendList.map(async(userRequest) => {
        return await User.findById({_id: userRequest.target_id}).select("-password -bio -address -phone")
    })
    const users = await Promise.all(sourceUser)
    res.status(200).json(users)
})





module.exports = {
    sendFriendRequest,
    getAllFriends,
    getAllPendingFriend,
}