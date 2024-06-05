import axios from 'axios';
import { httpClient } from './httpClient';

export const signUp = (req) => {
  return httpClient.post('/users', req);
};

export const getUserInfo = async (id) => {
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};

// Function to update user information by ID
export const updateUserInfo = async (id, userInfo) => {
  const response = await httpClient.put(`/users/${id}`, userInfo);
  return response.data;
};

// Function to delete a user by ID
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
    // Handle the error appropriately in the UI
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
  return axios.get('http://localhost:8080/api/auth/check-email', { params: { email } });
};

// export const refresh = () => {
//   return httpClient.post('/users/refresh');
// };
