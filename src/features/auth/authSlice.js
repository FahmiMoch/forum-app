import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, getProfile } from '../../api/authApi';

/**
 * LOGIN
 * → dapat token saja
 */
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser({ email, password });
      // response.data = { token }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

/**
 * REGISTER
 * → hanya membuat user (TIDAK login)
 */
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUser({ name, email, password });
      // response.data = { user }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Register failed');
    }
  }
);

/**
 * FETCH PROFILE
 * → ambil user dari token
 */
export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      // response.data = { user }
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch profile failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== REGISTER =====
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        // TIDAK set token di sini
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH PROFILE =====
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
