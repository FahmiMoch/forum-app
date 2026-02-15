import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createComment, voteComment } from '../../api/commentsApi';

const VOTE_UP = 1;
const VOTE_DOWN = -1;


export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const response = await createComment(threadId, content);
      return { threadId, comment: response.data.comment };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add comment',
      );
    }
  },
);

export const voteOnComment = createAsyncThunk(
  'comments/voteOnComment',
  async ({ threadId, commentId, voteType, userId }, { rejectWithValue }) => {
    try {
      await voteComment(threadId, commentId, voteType);
      return { threadId, commentId, voteType, userId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to vote comment',
      );
    }
  },
);

const applyVoteToComment = (comment, userId, voteType) => {
  if (!comment || !userId) return;

  comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
  comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);

  if (voteType === VOTE_UP) {
    comment.upVotesBy.push(userId);
  }

  if (voteType === VOTE_DOWN) {
    comment.downVotesBy.push(userId);
  }
};

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
  },

  extraReducers: (builder) => {
    builder
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

        applyVoteToComment(comment, userId, voteType);
      })
      .addCase(voteOnComment.rejected, (state, action) => {
        state.loadingVote = false;
        state.errorVote = action.payload;
      });
  },
});

export const { clearCommentsByThread } = commentsSlice.actions;

export default commentsSlice.reducer;
