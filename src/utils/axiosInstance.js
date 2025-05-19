// src/utils/axiosInstance.js
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';


// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const base = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstance = setupCache(base, {
  ttl: 1000 * 60, // 1 minute cache for GETs by default
  methods: ['get'], // Only GET requests are cached
  interpretHeader: false,
});

// 🧠 We'll attach the store manually later
let store;

export const injectStore = (_store) => {
  store = _store;
  console.log('store is', store.getState().auth);
};

// 🔒 Interceptor uses token from store instead of localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    if (store) {
      
      const token = store.getState().auth.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
