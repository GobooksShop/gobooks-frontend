import axios, { AxiosInstance } from 'axios';

// import { refresh } from './authApi';

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
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //   return refresh().then((res) => {
      //     if (res.data.statusCode === 'OK') {
      //       setAccessToken(httpClient, res.data.data.accessToken);
      //       return httpClient(originalRequest);
      //     }
      //   });
    }
    return Promise.reject(error);
  },
);

export const setAccessToken = (axiosInstance, accessToken) => {
  axiosInstance.defaults.headers.common['Authorization'] =
    `Bearer ${accessToken}`;
};

export const setAccessTokenToHttpClient = (accessToken) => {
  setAccessToken(httpClient, accessToken);
};
