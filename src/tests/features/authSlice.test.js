/**
 * Skenario:
 * - should return initial state
 * - should handle logout correctly
 * - should handle finishAuthLoading correctly
 * - should handle login.pending correctly
 * - should handle login.fulfilled correctly
 * - should handle login.rejected correctly
 * - should handle fetchMe.fulfilled correctly
 * - should handle fetchMe.rejected correctly
 * - should handle register.pending correctly
 * - should handle register.fulfilled correctly
 * - should handle register.rejected correctly
 */

import reducer, {
  logout,
  finishAuthLoading,
  login,
  register,
  fetchMe,
} from '../../features/auth/authSlice';

import * as authApi from '../../api/authApi';

jest.mock('../../api/authApi');

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    isAuthLoading: true,
    error: null,
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      ...initialState,
      token: null,
    });
  });

  it('should handle logout', () => {
    const prevState = {
      ...initialState,
      user: { id: '1' },
      token: 'abc123',
      isAuthLoading: true,
    };

    const nextState = reducer(prevState, logout());

    expect(nextState.user).toBeNull();
    expect(nextState.token).toBeNull();
    expect(nextState.isAuthLoading).toBe(false);
  });

  it('should handle finishAuthLoading', () => {
    const prevState = {
      ...initialState,
      isAuthLoading: true,
    };

    const nextState = reducer(prevState, finishAuthLoading());

    expect(nextState.isAuthLoading).toBe(false);
  });

  describe('login thunk', () => {
    it('should handle login.pending', () => {
      const action = { type: login.pending.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { token: 'abc123' },
      };

      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.token).toBe('abc123');
      expect(state.isAuthLoading).toBe(false);
    });

    it('should handle login.rejected', () => {
      const action = {
        type: login.rejected.type,
        payload: 'Login failed',
      };

      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Login failed');
      expect(state.isAuthLoading).toBe(false);
    });
  });

  describe('fetchMe thunk', () => {
    it('should handle fetchMe.fulfilled', () => {
      const action = {
        type: fetchMe.fulfilled.type,
        payload: { id: 'user-1', name: 'Bang' },
      };

      const state = reducer(initialState, action);

      expect(state.user).toEqual({ id: 'user-1', name: 'Bang' });
      expect(state.isAuthLoading).toBe(false);
    });

    it('should handle fetchMe.rejected', () => {
      const prevState = {
        ...initialState,
        token: 'abc123',
      };

      const action = {
        type: fetchMe.rejected.type,
      };

      const state = reducer(prevState, action);

      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthLoading).toBe(false);
    });
  });

  describe('register thunk', () => {
    it('should handle register.pending', () => {
      const action = { type: register.pending.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
    });

    it('should handle register.fulfilled', () => {
      const action = { type: register.fulfilled.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
    });

    it('should handle register.rejected', () => {
      const action = {
        type: register.rejected.type,
        payload: 'Register failed',
      };

      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Register failed');
    });
  });
    });