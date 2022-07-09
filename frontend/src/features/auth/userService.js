import axios from "axios"

const API_URL = "/api/users/"

const login = async (user) => {  
    const response = await axios.post(API_URL + "login", user)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}


const register = async (user) => {
    const response = await axios.post(API_URL + "signup", user)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}

const logout = async () => {
    return localStorage.removeItem("user")
}

const updateProfile = async(data, token) => {
    const config = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+"update", data, config)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}

const getAllUsers = async(token) => {
    const config =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + "allusers", config)
    return response.data
}
const userService = {
    login,
    register,
    logout,
    updateProfile,
    getAllUsers,
}
export default userService