/**
 * Skenario:
 * - should dispatch fulfilled action when fetchThreads success
 * - should dispatch rejected action when fetchThreads fails
 * - should reject voteOnThread when user is unauthorized
 * - should dispatch fulfilled action when voteOnThread success
 */

import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  fetchThreads,
  voteOnThread,
} from '../../features/thread/threadsSlice';

import * as threadsApi from '../../api/threadsApi';

// Mock API
jest.mock('../../api/threadsApi');

describe('threadsSlice thunk', () => {
  const createTestStore = (preloadedState) =>
    configureStore({
      reducer: {
        threads: reducer,
        auth: (state = { user: { id: 'user1' } }) => state,
      },
      preloadedState,
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fulfilled action when fetchThreads success', async () => {
    const mockThreads = [{ id: 't1', title: 'Thread 1' }];

    threadsApi.getAllThreads.mockResolvedValue(mockThreads);

    const store = createTestStore();

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe(fetchThreads.fulfilled.type);
    expect(result.payload).toEqual(mockThreads);
    expect(threadsApi.getAllThreads).toHaveBeenCalled();
  });

  it('should dispatch rejected action when fetchThreads fails', async () => {
    threadsApi.getAllThreads.mockRejectedValue({
      response: { data: { message: 'Error Fetch' } },
    });

    const store = createTestStore();

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe(fetchThreads.rejected.type);
    expect(result.payload).toBe('Error Fetch');
  });

  it('should reject voteOnThread when user is unauthorized', async () => {
    const store = configureStore({
      reducer: {
        threads: reducer,
        auth: () => ({ user: null }),
      },
    });

    const result = await store.dispatch(
      voteOnThread({ threadId: 't1', voteType: 1 })
    );

    expect(result.type).toBe(voteOnThread.rejected.type);
    expect(result.payload).toBe('Unauthorized');
  });

  it('should dispatch fulfilled action when voteOnThread success', async () => {
    threadsApi.voteThread.mockResolvedValue({});

    const store = createTestStore();

    const result = await store.dispatch(
      voteOnThread({ threadId: 't1', voteType: 1 })
    );

    expect(result.type).toBe(voteOnThread.fulfilled.type);
    expect(result.payload).toEqual({
      threadId: 't1',
      voteType: 1,
      userId: 'user1',
    });

    expect(threadsApi.voteThread).toHaveBeenCalledWith('t1', 1);
  });
});
