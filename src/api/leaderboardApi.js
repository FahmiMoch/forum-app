import apiClient from './apiClient';

export async function getLeaderboards() {
  const response = await apiClient.get('/leaderboards');
  return response.data.data;
}
