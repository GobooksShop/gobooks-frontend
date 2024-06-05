import { httpClient } from './httpClient';

export const signUp = (req) => {
  return httpClient.post('/users', req);
};

// export const refresh = () => {
//   return httpClient.post('/users/refresh');
// };
