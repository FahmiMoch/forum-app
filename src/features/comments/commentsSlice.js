import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createComment, voteComment } from '../../api/commentsApi';

// AsyncThunk: buat komentar baru
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const comment = await createComment(threadId, content);
      return { threadId, comment };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add comment');
    }
  }
);

// AsyncThunk: vote comment
export const voteOnComment = createAsyncThunk(
  'comments/voteOnComment',
  async ({ threadId, commentId, voteType }, { rejectWithValue }) => {
    try {
      const vote = await voteComment(threadId, commentId, voteType);
      return { threadId, commentId, vote };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to vote comment');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByThread: {}, // { threadId: [comments] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add Comment
    builder
      .addCase(addComment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const { threadId, comment } = action.payload;
        if (!state.commentsByThread[threadId]) {
          state.commentsByThread[threadId] = [];
        }
        state.commentsByThread[threadId].push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Vote Comment
    builder.addCase(voteOnComment.fulfilled, (state, action) => {
      const { threadId, commentId, vote } = action.payload;
      const comments = state.commentsByThread[threadId];
      if (comments) {
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
          // Update vote optimistically
          comment.upVotesBy = vote.voteType === 1 ? [vote.userId] : [];
          comment.downVotesBy = vote.voteType === -1 ? [vote.userId] : [];
        }
      }
    });
  },
});

export default commentsSlice.reducer;
