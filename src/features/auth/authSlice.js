import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, getProfile } from '../../api/authApi';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser({ email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUser({ name, email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Register failed');
    }
  },
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Fetch profile failed',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    isAuthLoading: true,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthLoading = false;
      localStorage.removeItem('token');
    },

    finishAuthLoading: (state) => {
      state.isAuthLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthLoading = false;
        localStorage.setItem('token', state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthLoading = false;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMe.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthLoading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        state.isAuthLoading = false;
      });
  },
});

export const { logout, finishAuthLoading } = authSlice.actions;
export default authSlice.reducer;
