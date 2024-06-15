import { httpClient, setAccessTokenToHttpClient } from './httpClient';

export const signUp = (req) => {
  return httpClient.post('/users', req);
};

export const login = async (req) => {
  const response = await httpClient.post('/auth/login', req);
  // const { accessToken } = response.data;
  // setAccessTokenToHttpClient(accessToken);
  return response;
};

export const logout = async () => {
  await httpClient.post('/auth/logout', {}, { withCredentials: true });
  console.log('Logout success!');
};

export const refreshAccessToken = async () => {
  const response = await httpClient.post('/auth/refresh');
  const { accessToken } = response.data;
  setAccessTokenToHttpClient(accessToken); // 새로운 Access Token 설정
  return response;
};

export const addCategoryFromApi = async (category) => {
  return await httpClient.post('/admin/categories', { category });
};

export const getCategoryFromApi = async () => {
  return await httpClient.get('/categories/hierarchy');
};
