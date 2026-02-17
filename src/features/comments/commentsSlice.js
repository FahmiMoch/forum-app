import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createComment, voteComment } from '../../api/commentsApi';

const VOTE_UP = 1;
const VOTE_DOWN = -1;

/*
  =========================
  ADD COMMENT
  =========================
*/
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const comment = await createComment(threadId, content);
      return { threadId, comment };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add comment'
      );
    }
  }
);

/*
  =========================
  VOTE COMMENT
  =========================
*/
export const voteOnComment = createAsyncThunk(
  'comments/voteOnComment',
  async ({ threadId, commentId, voteType }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth?.user?.id;

      if (!userId) {
        throw new Error('User not authenticated');
      }

      // call API sesuai voteType
      await voteComment(threadId, commentId, voteType);

      return { threadId, commentId, voteType, userId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          'Failed to vote comment'
      );
    }
  }
);

/*
  =========================
  HELPER VOTE LOGIC
  =========================
*/
const applyVoteToComment = (comment, userId, voteType) => {
  if (!comment || !userId) return;

  comment.upVotesBy = comment.upVotesBy || [];
  comment.downVotesBy = comment.downVotesBy || [];

  // Hapus vote lama dulu
  comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
  comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);

  // Apply vote baru
  if (voteType === VOTE_UP) {
    comment.upVotesBy.push(userId);
  } else if (voteType === VOTE_DOWN) {
    comment.downVotesBy.push(userId);
  }
  // kalau VOTE_NEUTRAL → tidak menambahkan apapun
};

/*
  =========================
  SLICE
  =========================
*/
const commentsSlice = createSlice({
  name: 'comments',

  initialState: {
    commentsByThread: {},
    loadingAdd: false,
    loadingVote: false,
    errorAdd: null,
    errorVote: null,
  },

  reducers: {
    clearCommentsByThread(state, action) {
      delete state.commentsByThread[action.payload];
    },

    // Optional helper kalau mau set initial comments dari thread detail
    setCommentsForThread(state, action) {
      const { threadId, comments } = action.payload;
      state.commentsByThread[threadId] = comments;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
        ADD COMMENT
      */
      .addCase(addComment.pending, (state) => {
        state.loadingAdd = true;
        state.errorAdd = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loadingAdd = false;

        const { threadId, comment } = action.payload;

        if (!state.commentsByThread[threadId]) {
          state.commentsByThread[threadId] = [];
        }

        state.commentsByThread[threadId].push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loadingAdd = false;
        state.errorAdd = action.payload;
      })

      /*
        VOTE COMMENT
      */
      .addCase(voteOnComment.pending, (state) => {
        state.loadingVote = true;
        state.errorVote = null;
      })
      .addCase(voteOnComment.fulfilled, (state, action) => {
        state.loadingVote = false;

        const { threadId, commentId, voteType, userId } = action.payload;

        const comments = state.commentsByThread[threadId];
        if (!comments) return;

        const comment = comments.find((c) => c.id === commentId);
        if (!comment) return;

        applyVoteToComment(comment, userId, voteType);
      })
      .addCase(voteOnComment.rejected, (state, action) => {
        state.loadingVote = false;
        state.errorVote = action.payload;
      });
  },
});

export const { clearCommentsByThread, setCommentsForThread } =
  commentsSlice.actions;

export default commentsSlice.reducer;
