import { httpClient } from '../httpClient';

export const saveOrder = async (email) => {
  const response = await httpClient.post('/auth/send-code', { email });
  return response.data;
};
