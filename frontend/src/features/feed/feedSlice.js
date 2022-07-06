import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import feedService from "./feedService"
const initialState = {
    feeds: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    isMessage: '',
    editForm: false,
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

// Create Feed
export const createFeed = createAsyncThunk("/create/feed", async(feed, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await feedService.createFeed(feed, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Feed 
export const updateFeed = createAsyncThunk("/update/feed", async(data, thunkAPI) => {
    try {
        const {id, formData} = data
        const token = thunkAPI.getState().user.user.token
        return await feedService.updateFeed(id, formData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Feed 
export const deleteFeed = createAsyncThunk("/delete/feed", async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await feedService.deleteFeed(id, token)
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
        },
        setEditForm: (state) => {
            state.editForm = true
        },
        unSetEditForm: (state) => {
            state.editForm = false
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
            .addCase(createFeed.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFeed.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feeds.unshift(action.payload)
            })
            .addCase(createFeed.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isMessage = action.payload
            })
            .addCase(updateFeed.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateFeed.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.feeds =  state.feeds.map(feed => feed._id === action.payload._id ? 
                                {   ...feed,
                                    title: action.payload.title,
                                    tags: action.payload.tags,
                                    img_url: action.payload.img_url
                                } : feed
                            )
            })
            .addCase(updateFeed.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isMessage = action.payload
            })
            .addCase(deleteFeed.fulfilled, (state, action) => {
                state.feeds = state.feeds.filter(feed => feed._id !== action.payload.id)
            })
            .addCase(deleteFeed.rejected, (state, action) => {
                state.isMessage = action.payload
            })
    }
})

export const { reset, setEditForm, unSetEditForm } = feedSlice.actions
export default feedSlice.reducer