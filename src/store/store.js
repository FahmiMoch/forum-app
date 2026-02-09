import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import threadsReducer from "../features/threads/threadsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";
import usersReducer from "../features/users/usersSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    comments: commentsReducer,
    leaderboard: leaderboardReducer,
    users: usersReducer,
  },
});

export default store;
