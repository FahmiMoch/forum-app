import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../api/leaderboardApi';

export const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getLeaderboards();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Failed to fetch leaderboard',
      );
    }
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;
