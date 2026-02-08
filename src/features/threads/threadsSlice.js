import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThreads,
  getThreadById,
  createThread,
  voteThread,
  deleteThread,
} from '../../api/threadsApi';

// =====================
// FETCH THREADS (PUBLIC)
// =====================
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllThreads();
      return response; // bisa { threads } atau langsung array
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Failed to fetch threads'
      );
    }
  }
);

// =====================
// FETCH THREAD DETAIL (PUBLIC)
// =====================
export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await getThreadById(threadId);
      return response; // bisa { detailThread }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Failed to fetch thread detail'
      );
    }
  }
);

// =====================
// CREATE THREAD (LOGIN)
// =====================
export const addThread = createAsyncThunk(
  'threads/addThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const response = await createThread({ title, body, category });
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Failed to create thread'
      );
    }
  }
);

// =====================
// DELETE THREAD (LOGIN)
// =====================
export const deleteThreadAsync = createAsyncThunk(
  'threads/deleteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      await deleteThread(threadId);
      return threadId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal menghapus thread'
      );
    }
  }
);

// =====================
// VOTE THREAD (LOGIN)
// =====================
export const voteOnThread = createAsyncThunk(
  'threads/voteOnThread',
  async ({ threadId, voteType }, { getState, rejectWithValue }) => {
    const user = getState().auth.user;
    if (!user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      await voteThread(threadId, voteType);
      return { threadId, voteType, userId: user.id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Failed to vote thread'
      );
    }
  }
);

// =====================
// SLICE
// =====================
const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    threadDetail: null,

    loadingThreads: false,
    loadingDetail: false,

    error: null,
  },

  reducers: {
    clearThreadDetail(state) {
      state.threadDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ===== FETCH THREADS =====
      .addCase(fetchThreads.pending, (state) => {
        state.loadingThreads = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loadingThreads = false;
        state.threads =
          action.payload.threads || action.payload || [];
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loadingThreads = false;
        state.error = action.payload;
      })

      // ===== FETCH DETAIL =====
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loadingDetail = true;
        state.threadDetail = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.threadDetail =
          action.payload.detailThread || action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload;
      })

      // ===== ADD THREAD =====
      .addCase(addThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })

      // ===== DELETE THREAD =====
      .addCase(deleteThreadAsync.fulfilled, (state, action) => {
        state.threads = state.threads.filter(
          (t) => t.id !== action.payload
        );

        if (state.threadDetail?.id === action.payload) {
          state.threadDetail = null;
        }
      })

      // ===== VOTE THREAD =====
      .addCase(voteOnThread.fulfilled, (state, action) => {
        const { threadId, voteType, userId } = action.payload;

        const applyVote = (thread) => {
          if (!thread) return;

          thread.upVotesBy = thread.upVotesBy.filter(
            (id) => id !== userId
          );
          thread.downVotesBy = thread.downVotesBy.filter(
            (id) => id !== userId
          );

          if (voteType === 1) thread.upVotesBy.push(userId);
          if (voteType === -1) thread.downVotesBy.push(userId);
        };

        applyVote(state.threads.find((t) => t.id === threadId));
        applyVote(state.threadDetail);
      });
  },
});

export const { clearThreadDetail } = threadsSlice.actions;
export default threadsSlice.reducer;
