import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export async function getLeaderboards() {
  const response = await axios.get(`${BASE_URL}/leaderboards`);
  return response.data.data;
}
