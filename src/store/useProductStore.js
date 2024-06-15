import * as productApi from '../api/product/productApi';
import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  productDetails: null,
  isLoading: false,
  error: null,

  fetchProductsByCategory: async (categoryId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.fetchProductsByCategory(categoryId);
      set({ products: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch products by category:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchProductDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.fetchProductDetails(id);
      set({ productDetails: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  addProduct: async (product) => {
    set({ isLoading: true });
    try {
      await productApi.addOrUpdateProduct(product);
      set((state) => ({
        products: [...state.products, product],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error adding product:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  updateProduct: async (id, product) => {
    set({ isLoading: true });
    try {
      const updatedProduct = await productApi.addOrUpdateProduct({ ...product, id });
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating product:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true });
    try {
      await productApi.deleteProduct(id);
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
