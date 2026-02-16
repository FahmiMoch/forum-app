import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThreads,
  getThreadById,
  createThread,
  voteThread,
  deleteThread,
} from '../../api/threadsApi';

/* =========================
   ASYNC THUNKS
========================= */

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await getAllThreads();
      return threads;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch threads'
      );
    }
  }
);

export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const detailThread = await getThreadById(threadId);
      return detailThread;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch thread detail'
      );
    }
  }
);

export const addThread = createAsyncThunk(
  'threads/addThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const thread = await createThread({ title, body, category });
      return thread;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create thread'
      );
    }
  }
);

export const deleteThreadAsync = createAsyncThunk(
  'threads/deleteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      await deleteThread(threadId);
      return threadId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete thread'
      );
    }
  }
);

export const voteOnThread = createAsyncThunk(
  'threads/voteOnThread',
  async ({ threadId, voteType }, { getState, rejectWithValue }) => {
    const user = getState().auth.user;
    if (!user) return rejectWithValue('Unauthorized');

    try {
      await voteThread(threadId, voteType);
      return { threadId, voteType, userId: user.id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to vote'
      );
    }
  }
);

/* =========================
   HELPERS
========================= */

const applyVote = (thread, userId, voteType) => {
  if (!thread || !userId) return;

  if (!thread.upVotesBy) thread.upVotesBy = [];
  if (!thread.downVotesBy) thread.downVotesBy = [];

  // remove previous vote
  thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
  thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

  // apply new vote
  if (voteType === 1) thread.upVotesBy.push(userId);
  if (voteType === -1) thread.downVotesBy.push(userId);
  // voteType === 0 → neutral (unvote)
};

/* =========================
   SLICE
========================= */

const threadsSlice = createSlice({
  name: 'threads',

  initialState: {
    threads: [],
    threadDetail: null,
    loading: false,
    loadingVote: false,
    error: null,
    errorVote: null,
  },

  reducers: {
    clearThreadDetail(state) {
      state.threadDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ========= FETCH ALL ========= */
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload.map((thread) => ({
          ...thread,
          totalComments: thread.totalComments ?? 0,
          upVotesBy: thread.upVotesBy ?? [],
          downVotesBy: thread.downVotesBy ?? [],
        }));
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= FETCH DETAIL ========= */
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = {
          ...action.payload,
          upVotesBy: action.payload.upVotesBy ?? [],
          downVotesBy: action.payload.downVotesBy ?? [],
        };
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= ADD THREAD ========= */
      .addCase(addThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addThread.fulfilled, (state, action) => {
        state.loading = false;

        state.threads.unshift({
          ...action.payload,
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        });
      })
      .addCase(addThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= DELETE ========= */
      .addCase(deleteThreadAsync.fulfilled, (state, action) => {
        state.threads = state.threads.filter(
          (t) => t.id !== action.payload
        );

        if (state.threadDetail?.id === action.payload) {
          state.threadDetail = null;
        }
      })

      /* ========= VOTE ========= */
      .addCase(voteOnThread.pending, (state) => {
        state.loadingVote = true;
        state.errorVote = null;
      })
      .addCase(voteOnThread.fulfilled, (state, action) => {
        state.loadingVote = false;

        const { threadId, voteType, userId } = action.payload;

        const listThread = state.threads.find(
          (t) => t.id === threadId
        );

        applyVote(listThread, userId, voteType);
        applyVote(state.threadDetail, userId, voteType);
      })
      .addCase(voteOnThread.rejected, (state, action) => {
        state.loadingVote = false;
        state.errorVote = action.payload;
      });
  },
});

export const { clearThreadDetail } = threadsSlice.actions;
export default threadsSlice.reducer;
