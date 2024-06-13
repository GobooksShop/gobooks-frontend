import { httpClient } from '../httpClient';

export const getProduct = async (productId) => {
  const response = await httpClient.get(`/products/${productId}`);
  return response.data;
};

export const saveOrder = async (email) => {
  const response = await httpClient.post('/auth/send-code', { email });
  return response.data;
};
