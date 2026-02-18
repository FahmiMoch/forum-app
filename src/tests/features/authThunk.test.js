/**
 * Skenario:
 * - should dispatch fulfilled when login success
 * - should dispatch rejected when login fails
 * - should dispatch rejected when register fails
 * - should dispatch fulfilled when fetchMe success
 * - should clear token when fetchMe fails
 */

import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  login,
  register,
  fetchMe,
} from '../../features/auth/authSlice';

import * as authApi from '../../api/authApi';

jest.mock('../../api/authApi');

describe('authSlice thunk', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        auth: reducer,
      },
    });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should dispatch fulfilled when login success', async () => {
    const mockResponse = {
      data: { token: 'fake-token' },
    };

    authApi.loginUser.mockResolvedValue(mockResponse);

    const store = createTestStore();

    const result = await store.dispatch(
      login({ email: 'test@mail.com', password: '123456' })
    );

    expect(result.type).toBe(login.fulfilled.type);
    expect(result.payload).toEqual(mockResponse.data);
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('should dispatch rejected when login fails', async () => {
    authApi.loginUser.mockRejectedValue({
      response: { data: { message: 'Login Error' } },
    });

    const store = createTestStore();

    const result = await store.dispatch(
      login({ email: 'test@mail.com', password: 'wrong' })
    );

    expect(result.type).toBe(login.rejected.type);
    expect(result.payload).toBe('Login Error');
  });

  it('should dispatch rejected when register fails', async () => {
    authApi.registerUser.mockRejectedValue({
      response: { data: { message: 'Register Error' } },
    });

    const store = createTestStore();

    const result = await store.dispatch(
      register({
        name: 'User',
        email: 'user@mail.com',
        password: '123456',
      })
    );

    expect(result.type).toBe(register.rejected.type);
    expect(result.payload).toBe('Register Error');
  });

  it('should dispatch fulfilled when fetchMe success', async () => {
    const mockProfile = {
      data: { user: { id: 'user1', name: 'Test User' } },
    };

    authApi.getProfile.mockResolvedValue(mockProfile);

    const store = createTestStore();

    const result = await store.dispatch(fetchMe());

    expect(result.type).toBe(fetchMe.fulfilled.type);
    expect(result.payload).toEqual(mockProfile.data.user);
  });

  it('should clear token when fetchMe fails', async () => {
    localStorage.setItem('token', 'old-token');

    authApi.getProfile.mockRejectedValue({});

    const store = createTestStore();

    const result = await store.dispatch(fetchMe());

    expect(result.type).toBe(fetchMe.rejected.type);
    expect(localStorage.getItem('token')).toBeNull();
  });
});
