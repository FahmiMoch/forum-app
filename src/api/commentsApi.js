import apiClient from './apiClient';

// Buat komentar baru
export const createComment = async (threadId, content, token) => {
  const response = await apiClient.post(
    `/threads/${threadId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data.comment;
};

// Vote comment
export const voteComment = async (threadId, commentId, voteType, token) => {
  const urlMap = {
    1: 'up-vote',
    0: 'neutral-vote',
    '-1': 'down-vote',
  };
  const response = await apiClient.post(
    `/threads/${threadId}/comments/${commentId}/${urlMap[voteType]}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data.vote;
};


