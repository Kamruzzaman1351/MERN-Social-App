import axios from "axios"

const API_URL = "/api/feeds/"

// Get All Feed
const getAllFeeds = async(token) => {
    const config = {
        headers: {
            Authorization : `Bearer ${token}`
        }        
    }
    const response = await axios.get(API_URL, config)
    return response.data
}
// Create Feed
const createFeed = async(feedData, token) => {
    const config = {
        headers: {
            Authorization : `Bearer ${token}`
        }        
    }
    const response = await axios.post(API_URL, feedData, config)
    return response.data
}
// Update Feed
const updateFeed = async(id, feedData, token) => {
    const config = {
        headers: {
            Authorization : `Bearer ${token}`
        }        
    }
    const response = await axios.put(API_URL + id, feedData, config)
    return response.data
}
// Delete Feed
const deleteFeed = async(id, token) => {
    const config = {
        headers: {
            Authorization : `Bearer ${token}`
        }        
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const feedService = {
    getAllFeeds,
    createFeed,
    updateFeed,
    deleteFeed,
}

export default feedService