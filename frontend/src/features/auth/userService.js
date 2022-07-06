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

const userService = {
    login,
    register,
    logout
}
export default userService