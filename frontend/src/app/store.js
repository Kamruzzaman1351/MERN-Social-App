import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/auth/userSlice"
import feedReducer from "../features/feed/feedSlice"
import friendReducer from "../features/friend/friendSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    feeds: feedReducer,
    friend: friendReducer,
  },
});
