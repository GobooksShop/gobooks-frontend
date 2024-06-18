import { httpClient } from '../httpClient';

export const fetchProductsByCategory = async (categoryId) => {
  return await httpClient.get(`/products/category/${categoryId}`);
};

export const addOrUpdateProduct = async (formData, id = null) => {
  if (id) {
    return await httpClient.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    return await httpClient.post(`/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

export const deleteProduct = async (id) => {
  return await httpClient.delete(`/products/${id}`);
};

export const fetchProductDetails = async (id) => {
  return await httpClient.get(`/products/${id}`);
};
