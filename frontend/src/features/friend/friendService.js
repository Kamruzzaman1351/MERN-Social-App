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




const friendService = {
    getAllFriend,

}

export default friendService