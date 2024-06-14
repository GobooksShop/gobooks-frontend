import { httpClient } from '../httpClient';

export const getProduct = async (productIdList) => {
  const productList = [];
  for (const productId of productIdList) {
    const response = await httpClient.get(`/products/${productId}`)
    productList.push(response.data);
  }
  return productList;
};
/**
 *
 * @param selectedCartItems - urlParams의 실제 객체명
 */
export const varifyCartDatas = async (urlParams) => {
  const response = await httpClient.get('/cart/verify', { params :urlParams })
    .catch(error => console.log(error));
  return response;
}


