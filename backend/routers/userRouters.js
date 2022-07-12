const express = require("express")
const {userLogin, userSignup, userProfileUpdate, getAllUsers, getUserInfo} = require("../controllers/userController.js")
const {sendFriendRequest, getAllFriends, approvedFriendRequest} = require("../controllers/friendRequestController.js")
const userProtect = require("../middleware/userMiddleware.js")
const router = express.Router()

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.put("/update", userProtect, userProfileUpdate)
router.get("/allusers", userProtect, getAllUsers)
router.get("/friends", userProtect, getAllFriends)
router.post("/request", userProtect, sendFriendRequest)
router.put("/approved-request", userProtect, approvedFriendRequest)
router.get("/:id", userProtect, getUserInfo)

module.exports = router