import apiClient from './apiClient';

/*
  CREATE COMMENT
*/
export const createComment = async (threadId, content) => {
  const response = await apiClient.post(
    `/threads/${threadId}/comments`,
    { content }
  );

  return response.data.data.comment;
};

/*
  VOTE COMMENT
*/
export const voteComment = async (threadId, commentId, voteType) => {
  const urlMap = {
    1: 'up-vote',
    0: 'neutral-vote',
    [-1]: 'down-vote',
  };

  const endpoint = urlMap[voteType];

  if (!endpoint) {
    throw new Error(`Invalid voteType: ${voteType}`);
  }

  const response = await apiClient.post(
    `/threads/${threadId}/comments/${commentId}/${endpoint}`
  );

  return response.data.data;
};
