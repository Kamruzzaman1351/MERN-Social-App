const express = require("express")
const {getAllFeeds, createFeed, updateFeed, deleteFeed, updateLike} = require("../controllers/feedController.js")
const router = express.Router()
const userProtect = require("../middleware/userMiddleware.js")
router.get("", userProtect, getAllFeeds)
router.post("", userProtect, createFeed)
router.put("/:id", userProtect, updateFeed)
router.delete("/:id", userProtect, deleteFeed)
router.put("/:id/likefeed", userProtect, updateLike)

module.exports = router