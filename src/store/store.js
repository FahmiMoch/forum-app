import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/authSlice';
import threadsReducer from '../features/thread/threadsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';
import usersReducer from '../features/users/usersSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    threads: threadsReducer,
    comments: commentsReducer,
    leaderboard: leaderboardReducer,
    users: usersReducer,
  },
});

export const persistor = persistStore(store);

export default store;
