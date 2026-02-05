import apiClient from './apiClient';

// Ambil semua thread
export const getAllThreads = async () => {
  const response = await apiClient.get('/threads');
  return response.data.data.threads;
};

// Ambil detail thread
export const getThreadById = async (threadId) => {
  const response = await apiClient.get(`/threads/${threadId}`);
  return response.data.data.detailThread;
};

// Buat thread baru
export const createThread = async ({ title, body, category }, token) => {
  const response = await apiClient.post('/threads', { title, body, category }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data.thread;
};

// Vote thread
export const voteThread = async (threadId, voteType, token) => {
  const urlMap = {
    1: 'up-vote',
    0: 'neutral-vote',
    '-1': 'down-vote',
  };
  const response = await apiClient.post(
    `/threads/${threadId}/${urlMap[voteType]}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data.vote;
};

