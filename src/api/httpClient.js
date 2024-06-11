import axios from 'axios';
import { refreshAccessToken } from './authApi';

export const httpClient = axios.create({
  // eslint-disable-next-line
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // 로그아웃 처리 등 추가적인 처리가 필요할 수 있음
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const setAccessTokenToHttpClient = (accessToken) => {
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
