import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import feedService from "./feedService"
const initialState = {
    feeds: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    isMessage: ''
}

// Get All Feeds
export const getAllFeeds = createAsyncThunk("/allfeeds", async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await feedService.getAllFeeds(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const feedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isMessage = ''
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFeeds.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllFeeds.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feeds = action.payload
            })
            .addCase(getAllFeeds.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.isMessage = action.payload
            })
    }
})

export const { reset } = feedSlice.actions
export default feedSlice.reducer