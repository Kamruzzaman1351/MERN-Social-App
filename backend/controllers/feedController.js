const asyncHandler = require("express-async-handler")



// @desc Get All Feeds
// @route /api/feeds
// @access All Users
const getAllFeeds = asyncHandler(async (req, res) => {
    res.json({
        message: "Get all feeds"
    })
})
// @desc Create Feed
// @route /api/feeds
// @access User
const createFeed = asyncHandler(async (req, res) => {
    res.json({
        message: "Create feed"
    })
})
// @desc Get Update Feed
// @route /api/feeds/id
// @access User
const updateFeed = asyncHandler(async (req, res) => {
    res.json({
        message: `Update feeds ${req.params.id}`
    })
})
// @desc Delete Feed
// @route /api/feeds/id
// @access All Users
const deleteFeed = asyncHandler(async (req, res) => {
    res.json({
        message: `Delete feed ${req.params.id}`
    })
})

module.exports = {
    getAllFeeds,
    createFeed,
    updateFeed,
    deleteFeed
}