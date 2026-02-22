import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../api/leaderboardApi';

export const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getLeaderboards();

      const sortedLeaderboards = [...data.leaderboards].sort(
        (a, b) => b.score - a.score
      );

      return sortedLeaderboards;

    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Failed to fetch leaderboard'
      );
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',

  initialState: {
    leaderboards: [],
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
        state.leaderboards = action.payload;
      })

      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },

});

export default leaderboardSlice.reducer;