import apiClient from './apiClient';

export const registerUser = async ({ name, email, password }) => {
  const response = await apiClient.post('/register', { name, email, password });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};
