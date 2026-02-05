import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

// Tambahkan Authorization header kalau token ada
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
