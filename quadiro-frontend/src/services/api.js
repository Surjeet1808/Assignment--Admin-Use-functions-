import axios from 'axios';

const api = axios.create({
  baseURL: 'https://assignment-admin-use-functions.onrender.com/', // Replace with your backend URL if different
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
