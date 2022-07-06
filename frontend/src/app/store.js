import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/auth/userSlice"
import feedReducer from "../features/feed/feedSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    feeds: feedReducer,
  },
});
