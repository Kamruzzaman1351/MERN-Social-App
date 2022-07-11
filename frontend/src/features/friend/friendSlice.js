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
    }
})


export const { reset } = friendSlice.actions
export default friendSlice.reducer