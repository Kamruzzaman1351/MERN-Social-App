const express = require("express")
const {userLogin, userSignup, userProfileUpdate} = require("../controllers/userController.js")
const userProtect = require("../middleware/userMiddleware.js")
const router = express.Router()

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.put("/update", userProtect, userProfileUpdate)


module.exports = router