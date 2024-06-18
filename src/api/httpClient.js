import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const httpClient = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    // debug용 URL을 콘솔에 출력
    console.log(`Request made to URL: ${config.url}`);
    // debug용 요청 데이터가 존재하는 경우 출력
    if (config.data) {
      console.log('Request Data:', JSON.stringify(config.data));
    } else {
      console.log('No Request Data');
    }
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      setAccessTokenToHttpClient(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const authorizationHeader = error.response.headers['authorization'];
        if (authorizationHeader) {
          console.log('Old Access Token:', localStorage.getItem('accessToken'));
          const newAccessToken = authorizationHeader.split(' ')[1];
          console.log('New Access Token:', newAccessToken);
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          setAccessTokenToHttpClient(newAccessToken);
          return httpClient(originalRequest);
        } else {
          console.error('Authorization header is not present');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const setAccessTokenToHttpClient = (accessToken) => {
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
