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
    const friendList = await UserFriend.find({source_id: req.user.id})
    const friendListRecived = await UserFriend.find({target_id: req.user.id})
    const sourceUser = friendList.map(async(userRequest) => {
        const user =  await User.findById({_id: userRequest.target_id}).select("-password -bio -address -phone")
        // user.state = await userRequest.status
        return {
            _id: userRequest._id,
            id: user._id,
            name: user.name,
            email: user.email,
            profession: user.profession,
            avatar: user.avatar,
            state: userRequest.status
        }
    })
    const recUser = friendListRecived.map(async(userRequest) => {
        const user =  await User.findById({_id: userRequest.source_id}).select("-password -bio -address -phone")
        // user.state = await userRequest.status
        return {
            _id: userRequest._id,
            id: user._id,
            name: user.name,
            email: user.email,
            profession: user.profession,
            avatar: user.avatar,
            state: userRequest.status,
            recived: "recived"
        }
    })
    const users = await Promise.all(sourceUser)
    const recivedUser = await Promise.all(recUser)
    // const allFriend = users.concat(recivedUser)
    res.status(200).json([
        users,
        recivedUser,
    ])
})

// @desc Approved Friend Request
// @route Get /api/users/approved-request
// @access User
const approvedFriendRequest = asyncHandler(async(req, res) => {
    const {id} = req.body
    if(!req.user) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    if(!id) {
        res.status(400)
        throw new Error("Request Id is require")
    }
    const friendRequest = await UserFriend.findOne({_id: id, target_id: req.user.id })
    if(!friendRequest) {
        res.status(400)
        throw new Error("Does not found")
    }
    await UserFriend.findByIdAndUpdate(req.body.id, {status:true}, {new:true})
    res.status(200).json({})
})

// @desc Get all Friends 
// @route Get /api/users/allfriends
// @access User
const getFriends = asyncHandler(async(req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error("Not authorized")
    }
    const requests = await UserFriend.find(
            {   status:true, 
                $or: [{source_id: req.user.id }, {target_id: req.user.id} ]
            })
    if(requests.length === 0 ) {
        res.status(400)
        throw new Error("Friend does not found")
    }
    const friends = requests.map(async(friend)=> {
        if(friend.target_id.toString() === req.user.id.toString()) {
            const user = await User.findById(friend.source_id)
            return {
                _id: friend._id,
                id: user._id,
                name: user.name,
                img: user.avatar
            }
        } else {
            const user = await User.findById(friend.target_id)
            return {
                _id: friend._id,
                id: user._id,
                name: user.name,
                img: user.avatar
            }
        }
    })
    const allFriends = await Promise.all(friends)
    res.status(200).json(allFriends)
})

module.exports = {
    sendFriendRequest,
    getAllFriends,
    approvedFriendRequest,
    getFriends,
}