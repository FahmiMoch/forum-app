import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThreads,
  getThreadById,
  createThread,
  voteThread,
} from '../../api/threadsApi';

// =====================
// FETCH THREADS
// =====================
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllThreads();
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch threads');
    }
  }
);

// =====================
// FETCH THREAD DETAIL
// =====================
export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      return await getThreadById(threadId);
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch thread detail');
    }
  }
);

// =====================
// ADD THREAD
// =====================
export const addThread = createAsyncThunk(
  'threads/addThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      return await createThread({ title, body, category });
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to create thread');
    }
  }
);

// =====================
// VOTE THREAD (SAFE)
// =====================
export const voteOnThread = createAsyncThunk(
  'threads/voteOnThread',
  async ({ threadId, voteType }, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;
      if (!user) {
        return rejectWithValue('User not authenticated');
      }

      await voteThread(threadId, voteType);
      return { threadId, voteType, userId: user.id };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to vote thread');
    }
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    threadDetail: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearThreadDetail(state) {
      state.threadDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =====================
      // FETCH THREADS
      // =====================
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // FETCH DETAIL
      // =====================
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.threadDetail = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // ADD THREAD
      // =====================
      .addCase(addThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })

      // =====================
      // VOTE THREAD
      // =====================
      .addCase(voteOnThread.fulfilled, (state, action) => {
        const { threadId, voteType, userId } = action.payload;

        const updateVote = (thread) => {
          if (!thread) return;

          thread.upVotesBy = thread.upVotesBy.filter(id => id !== userId);
          thread.downVotesBy = thread.downVotesBy.filter(id => id !== userId);

          if (voteType === 1) thread.upVotesBy.push(userId);
          if (voteType === -1) thread.downVotesBy.push(userId);
        };

        updateVote(state.threads.find(t => t.id === threadId));
        if (state.threadDetail?.id === threadId) {
          updateVote(state.threadDetail);
        }
      });
  },
});

export const { clearThreadDetail } = threadsSlice.actions;
export default threadsSlice.reducer;
