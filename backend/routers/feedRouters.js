const express = require("express")
const {getAllFeeds, createFeed, updateFeed, deleteFeed} = require("../controllers/feedController.js")
const router = express.Router()

router.get("", getAllFeeds)
router.post("", createFeed)
router.put("/:id", updateFeed)
router.delete("/:id", deleteFeed)


module.exports = router