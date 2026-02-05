import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../../api/usersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllUsers(); // ← ARRAY USERS
    } catch (err) {
      return rejectWithValue('Fetch users failed');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], // 🔥 ARRAY LANGSUNG
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // 🔥 SIMPEL & BENAR
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
