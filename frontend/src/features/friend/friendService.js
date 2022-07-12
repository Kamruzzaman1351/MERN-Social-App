import axios from "axios";

const API_URL = "/api/users/"

const getAllFriend = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + "friends", config)
    return response.data
}

const sendFriendRequest = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "request", id, config)
    return response.data
}

const acceptFriendRequest = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + "approved-request", id, config)
    return response.data
}

const friendService = {
    getAllFriend,
    sendFriendRequest,
    acceptFriendRequest,
}

export default friendService