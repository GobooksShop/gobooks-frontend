import { httpClient } from '../httpClient';

export const fetchCategories = async () => {
  const response = await httpClient.get('/categories/hierarchy');
  return response.data;
};

export const addCategory = async (category) => {
  const response = await httpClient.post('/admin/categories', category);
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await httpClient.put(`/admin/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  await httpClient.delete(`/admin/categories/${id}`);
};
