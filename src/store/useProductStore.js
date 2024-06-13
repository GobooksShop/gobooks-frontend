import axios from 'axios';
import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProductsByCategory: async (categoryId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/category/${categoryId}`,
      );
      set({ products: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  addOrUpdateProduct: async (product) => {
    set({ isLoading: true });
    const method = product.id ? 'put' : 'post';
    const url = product.id
      ? `http://localhost:8080/api/admin/products/${product.id}`
      : 'http://localhost:8080/api/admin/products';
    try {
      const response = await axios[method](url, product);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? { ...p, ...product } : p,
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error adding or updating product:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`http://localhost:8080/api/admin/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useProductStore;
