import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllThreads } from '../../api/threadsApi';

export const fetchThreads = createAsyncThunk('threads/fetchThreads', async (_, { rejectWithValue }) => {
  try {
    const data = await getAllThreads();
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchThreads.fulfilled, (state, action) => { state.loading = false; state.threads = action.payload; })
      .addCase(fetchThreads.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || 'Failed to fetch threads'; });
  },
});

export default threadsSlice.reducer;
