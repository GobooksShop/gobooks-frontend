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

export const getUserInfo = async (id) => {
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};

export const updateUserInfo = async (id, userInfo) => {
  const response = await httpClient.put(`/users/${id}`, userInfo);
  return response.data;
};

export const deleteUser = async (id) => {
  await httpClient.delete(`/users/${id}`);
};

export const getAllUserInfo = async () => {
  const response = await httpClient.get(`/users`);
  return response.data;
};

const handleFetchUserInfo = async (userId) => {
  try {
    const userInfo = await getUserInfo(userId);
    // Process userInfo
    console.log(userInfo);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};

export const sendVerificationCode = async (email) => {
  const response = await httpClient.post('/auth/send-code', { email });
  return response.data;
};

export const verifyCode = async (email, code) => {
  const response = await httpClient.post('/auth/verify-code', { email, code });
  return response.data;
};

export const checkEmail = (email) => {
  return httpClient.get('/auth/check-email', { params: { email } });
};

export const addCategoryFromApi = async (category) => {
  return await httpClient.post('/admin/categories', { category });
};

export const getCategoryFromApi = async () => {
  return await httpClient.get('/categories/hierarchy');
};
