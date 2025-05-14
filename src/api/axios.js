// import axios from 'axios';
// // sets up your base API URL

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// // Every time we make a request, it will automatically attach the JWT token if logged in

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default instance;


import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
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
