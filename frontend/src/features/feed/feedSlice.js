import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    feeds: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    isMessage: ''
}

const feedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {
        reset: () => {

        }
    },
    extraReducers: (builder) => {

    }
})

export const { reset } = feedSlice.actions
export default feedSlice.reducer