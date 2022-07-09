const express = require("express")
const {userLogin, userSignup, userProfileUpdate, getAllUsers} = require("../controllers/userController.js")
const userProtect = require("../middleware/userMiddleware.js")
const router = express.Router()

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.put("/update", userProtect, userProfileUpdate)
router.get("/allusers", userProtect, getAllUsers)

module.exports = router