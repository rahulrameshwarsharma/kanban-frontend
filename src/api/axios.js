import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5001/api',
  baseURL: 'https://kanban-backend-wfsw.onrender.com/api',
});

// Attach token for every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
