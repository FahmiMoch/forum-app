import apiClient from './apiClient';

/**
 * Buat komentar baru
 */
export const createComment = async (threadId, content) => {
  const response = await apiClient.post(
    `/threads/${threadId}/comments`,
    { content }
  );
  return response.data.data.comment;
};

/**
 * Vote comment
 */
export const voteComment = async (threadId, commentId, voteType) => {
  const urlMap = {
    1: 'up-vote',
    0: 'neutral-vote',
    [-1]: 'down-vote',
  };

  const response = await apiClient.post(
    `/threads/${threadId}/comments/${commentId}/${urlMap[voteType]}`
  );

  return response.data.data.vote;
};

