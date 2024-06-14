import axios from 'axios';
import useUserStore from '../store/useUserStore';

export const httpClient = axios.create({
  // eslint-disable-next-line
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Content-Type': 'application/json',
  },
  // timeout: 5000, // 기본 백엔드 서버에 요청시 5초안에 무응답이면 에러 발생.
});

httpClient.interceptors.request.use(
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

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const response = error.response;
    const Authorization = error.Authorization;
    console.log('response.Authorization:' + response.data);
    console.log('response.Authorization2:' + Authorization);

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { newAccessToken } = response.Authorization;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        setAccessTokenToHttpClient(newAccessToken);
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
