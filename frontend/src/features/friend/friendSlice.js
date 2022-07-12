import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import friendService from "./friendService"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    friends: [],
    isMessage: '',
}

// Get Friend List
export const getAllFriend = createAsyncThunk("/user/friend", async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await friendService.getAllFriend(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Send Friend Request
export const sendFriendRequest = createAsyncThunk("/friend/request", async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await friendService.sendFriendRequest(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// Accept Friend Request
export const acceptFriendRequest = createAsyncThunk("/friend/accept", async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await friendService.acceptFriendRequest(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isMessage = ''
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFriend.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllFriend.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isMessage = ''
                state.isError = false
                state.friends = action.payload
            })
            .addCase(getAllFriend.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isMessage = action.payload
                state.isError = true
            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.isSuccess = true
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.isSuccess = false
                state.isError = true
                state.isMessage = action.payload
                state.isLoading = false
            })
            .addCase(acceptFriendRequest.fulfilled, (state) => {
                state.isSuccess = true
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.isSuccess = false
                state.isError = true
                state.isMessage = action.payload
            })
    }
})


export const { reset } = friendSlice.actions
export default friendSlice.reducer