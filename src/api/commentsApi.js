import apiClient from './apiClient';

/**
 * Buat komentar baru
 * @param {string} threadId
 * @param {string} content
 * @returns {Promise<Object>}
 */
export const createComment = async (threadId, content) => {
  try {
    const response = await apiClient.post(`/threads/${threadId}/comments`, { content });
    return response.data.data.comment;
  } catch (error) {
    console.error('Create Comment Error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Vote comment (1 = upvote, 0 = neutral, -1 = downvote)
 * @param {string} threadId
 * @param {string} commentId
 * @param {number} voteType
 * @returns {Promise<Object>}
 */
export const voteComment = async (threadId, commentId, voteType) => {
  try {
    const urlMap = {
      1: 'up-vote',
      0: 'neutral-vote',
      [-1]: 'down-vote',
    };
    const response = await apiClient.post(
      `/threads/${threadId}/comments/${commentId}/${urlMap[voteType]}`
    );
    return response.data.data.vote;
  } catch (error) {
    console.error('Vote Comment Error:', error.response?.data || error.message);
    throw error;
  }
};
