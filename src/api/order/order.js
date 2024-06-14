import { httpClient } from '../httpClient';

export const getProduct = async (productId) => {
  const response = await httpClient.get(`/products/${productId}`);
  return response.data;
};

export const saveOrder = async (createOrderRequestData) => {
  const response = await httpClient.post('/orders', { email });
  return response.data;
};
