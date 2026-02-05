import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createComment } from '../../api/commentsApi';

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ threadId, content, token }, { rejectWithValue }) => {
    try {
      const data = await createComment(threadId, content, token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    setComments: (state, action) => { state.comments = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addComment.fulfilled, (state, action) => { state.loading = false; state.comments.push(action.payload); })
      .addCase(addComment.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || 'Failed to add comment'; });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
