const asyncHandler = require("express-async-handler")
const Feed = require("../models/feedModel.js")


// @desc Get All Feeds
// @route GET /api/feeds
// @access All Users
const getAllFeeds = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error("You are not Authorized")
    }
    const feeds = await Feed.find().sort({createdAt: -1})
    res.status(200).json(feeds)
})
// @desc Create Feed
// @route POST /api/feeds
// @access All Users
const createFeed = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    const {title, img_url, tags, body} = req.body
    if(!title || !img_url || !body) {
        res.status(400)
        throw new Error("Need an Image, title and body ")
    }
    const feed = await Feed.create({
        user_id: req.user._id,
        user_name: req.user.name,
        title,
        body,
        img_url,
        tags: tags.split(",")
    })

    res.status(201).json(feed)
})
// @desc  Update Feed
// @route PUT /api/feeds/id
// @access Single User
const updateFeed = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    const feed = await Feed.findById(req.params.id).where("user_id").equals(req.user._id)
    if(!feed) {
        res.status(400)
        throw new Error("Not Authorized to Update")
    }
    if(feed.user_id.toString() !== req.user._id.toString()) {
        res.status(400)
        throw new Error("Not Authorized to Update")
    }
    const updatedFeed = await Feed.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedFeed)
})
// @desc Delete Feed
// @route DELETE /api/feeds/id
// @access Single User
const deleteFeed = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error("Not Authorized")
    }
    const feed = await Feed.findById(req.params.id).where("user_id").equals(req.user._id)
    if(!feed) {
        res.status(400)
        throw new Error("Not Authorized to Delete")
    }
    if(feed.user_id.toString() !== req.user._id.toString()) {
        res.status(400)
        throw new Error("Not Authorized to Delete")
    }
    await Feed.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message: "Feed Deleted",
        id: req.params.id
    })
})

module.exports = {
    getAllFeeds,
    createFeed,
    updateFeed,
    deleteFeed
}