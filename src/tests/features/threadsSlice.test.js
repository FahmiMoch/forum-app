/**
 * Skenario:
 * - should return initial state when given unknown action
 * - should handle fetchThreads.fulfilled correctly
 * - should handle addThread.fulfilled and prepend new thread
 * - should handle deleteThreadAsync.fulfilled correctly
 * - should handle voteOnThread.fulfilled for upvote
 * - should handle voteOnThread.fulfilled for neutral (toggle vote)
 */

import reducer, {
  fetchThreads,
  addThread,
  deleteThreadAsync,
  voteOnThread,
} from '../../features/thread/threadsSlice';

describe('threadsSlice reducer', () => {
  const initialState = {
    threads: [],
    threadDetail: null,
    loading: false,
    loadingVote: false,
    error: null,
    errorVote: null,
  };

  it('should return initial state when given unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  it('should handle fetchThreads.fulfilled correctly', () => {
    const mockThreads = [
      { id: 't1', title: 'Thread 1' },
    ];

    const action = {
      type: fetchThreads.fulfilled.type,
      payload: mockThreads,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.threads.length).toBe(1);
    expect(state.threads[0].totalComments).toBe(0);
    expect(state.threads[0].upVotesBy).toEqual([]);
    expect(state.threads[0].downVotesBy).toEqual([]);
  });

  it('should handle addThread.fulfilled and prepend new thread', () => {
    const prevState = {
      ...initialState,
      threads: [{ id: 'old', title: 'Old Thread' }],
    };

    const newThread = { id: 'new', title: 'New Thread' };

    const action = {
      type: addThread.fulfilled.type,
      payload: newThread,
    };

    const state = reducer(prevState, action);

    expect(state.threads[0].id).toBe('new');
    expect(state.threads[0].totalComments).toBe(0);
    expect(state.threads[0].upVotesBy).toEqual([]);
    expect(state.threads[0].downVotesBy).toEqual([]);
  });

  it('should handle deleteThreadAsync.fulfilled correctly', () => {
    const prevState = {
      ...initialState,
      threads: [
        { id: 't1', title: 'Thread 1' },
        { id: 't2', title: 'Thread 2' },
      ],
      threadDetail: { id: 't1' },
    };

    const action = {
      type: deleteThreadAsync.fulfilled.type,
      payload: 't1',
    };

    const state = reducer(prevState, action);

    expect(state.threads.length).toBe(1);
    expect(state.threads[0].id).toBe('t2');
    expect(state.threadDetail).toBeNull();
  });

  it('should handle voteOnThread.fulfilled for upvote', () => {
    const prevState = {
      ...initialState,
      threads: [
        { id: 't1', upVotesBy: [], downVotesBy: [] },
      ],
    };

    const action = {
      type: voteOnThread.fulfilled.type,
      payload: {
        threadId: 't1',
        voteType: 1,
        userId: 'user1',
      },
    };

    const state = reducer(prevState, action);

    expect(state.threads[0].upVotesBy).toContain('user1');
    expect(state.threads[0].downVotesBy).not.toContain('user1');
  });

  it('should handle voteOnThread.fulfilled for neutral (toggle vote)', () => {
    const prevState = {
      ...initialState,
      threads: [
        {
          id: 't1',
          upVotesBy: ['user1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: voteOnThread.fulfilled.type,
      payload: {
        threadId: 't1',
        voteType: 0,
        userId: 'user1',
      },
    };

    const state = reducer(prevState, action);

    expect(state.threads[0].upVotesBy).not.toContain('user1');
    expect(state.threads[0].downVotesBy).not.toContain('user1');
  });
});
