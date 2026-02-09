import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThreads,
  getThreadById,
  createThread,
  voteThread,
  deleteThread,
} from '../../api/threadsApi';

/* =====================
   ASYNC THUNKS
===================== */

// ✅ GET ALL THREADS
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await getAllThreads(); // ⬅️ ARRAY LANGSUNG
      return threads;
    } catch (error) {
      console.error('fetchThreads error:', error);
      return rejectWithValue('Failed to fetch threads');
    }
  }
);

// ✅ GET THREAD DETAIL
export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const detailThread = await getThreadById(threadId);
      return detailThread;
    } catch (error) {
      console.error('fetchThreadDetail error:', error);
      return rejectWithValue('Failed to fetch thread detail');
    }
  }
);

// ✅ CREATE THREAD
export const addThread = createAsyncThunk(
  'threads/addThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const thread = await createThread({ title, body, category });
      return thread;
    } catch (error) {
      console.error('addThread error:', error);
      return rejectWithValue('Failed to create thread');
    }
  }
);

// ✅ DELETE THREAD
export const deleteThreadAsync = createAsyncThunk(
  'threads/deleteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      await deleteThread(threadId);
      return threadId;
    } catch (error) {
      console.error('deleteThread error:', error);
      return rejectWithValue('Failed to delete thread');
    }
  }
);

// ✅ VOTE THREAD
export const voteOnThread = createAsyncThunk(
  'threads/voteOnThread',
  async ({ threadId, voteType }, { getState, rejectWithValue }) => {
    const user = getState().auth.user;
    if (!user) return rejectWithValue('Unauthorized');

    try {
      await voteThread(threadId, voteType);
      return { threadId, voteType, userId: user.id };
    } catch (error) {
      console.error('voteThread error:', error);
      return rejectWithValue('Failed to vote');
    }
  }
);

/* =====================
   HELPERS
===================== */

const applyVote = (thread, userId, voteType) => {
  if (!thread) return;

  thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
  thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

  if (voteType === 1) thread.upVotesBy.push(userId);
  if (voteType === -1) thread.downVotesBy.push(userId);
};

/* =====================
   SLICE
===================== */

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

      /* FETCH THREADS */
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.threads = action.payload.map((thread) => ({
          ...thread,
          totalComments: thread.totalComments ?? 0,
        }));
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH THREAD DETAIL */
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD THREAD */
      .addCase(addThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addThread.fulfilled, (state, action) => {
        state.loading = false;
        state.threads.unshift({
          ...action.payload,
          totalComments: 0,
        });
      })
      .addCase(addThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE THREAD */
      .addCase(deleteThreadAsync.fulfilled, (state, action) => {
        state.threads = state.threads.filter(
          (t) => t.id !== action.payload
        );
      })

      /* VOTE THREAD */
      .addCase(voteOnThread.fulfilled, (state, action) => {
        const { threadId, voteType, userId } = action.payload;

        applyVote(
          state.threads.find((t) => t.id === threadId),
          userId,
          voteType
        );

        applyVote(state.threadDetail, userId, voteType);
      });
  },
});

export const { clearThreadDetail } = threadsSlice.actions;
export default threadsSlice.reducer;
