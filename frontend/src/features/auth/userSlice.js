import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import userService from "./userService"


const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isMessage: '',
}

// User Login
export const loginUser = createAsyncThunk("/user/login", async(user, thunkAPI) => {
    try {
        return await userService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// User Registration
export const registerUser = createAsyncThunk("/user/siginIn", async(user, thunkAPI) => {
    try {
        return await userService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout User
export const logoutUser = createAsyncThunk("/user/logout", async() => {
    return await userService.logout()
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.isMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.isMessage = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
            })
    }
})


export const { reset } = userSlice.actions
export default userSlice.reducer