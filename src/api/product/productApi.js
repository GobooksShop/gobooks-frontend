import { httpClient } from '../httpClient';

export const fetchProductsByCategory = async (categoryId) => {
  return await httpClient.get(`/products/category/${categoryId}`);
};

export const addOrUpdateProduct = async (product) => {
  if (product.id) {
    return await httpClient.put(`/products/${product.id}`, product);
  } else {
    return await httpClient.post(`/products`, product);
  }
};

export const deleteProduct = async (id) => {
  return await httpClient.delete(`/products/${id}`);
};

export const fetchProductDetails = async (id) => {
  return await httpClient.get(`/products/${id}`);
};
