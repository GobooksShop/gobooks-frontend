import axios from 'axios';
import create from 'zustand';

const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      set({ categories: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      set({ error, isLoading: false });
    }
  },

  addCategory: async (category) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('http://localhost:8080/api/admin/categories', category);
      set(state => ({ categories: [...state.categories, response.data], isLoading: false }));
    } catch (error) {
      console.error('Failed to add category:', error);
      set({ error, isLoading: false });
    }
  },

  updateCategory: async (id, category) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/categories/${id}`, category);
      set(state => ({
        categories: state.categories.map(cat => cat.id === id ? response.data : cat),
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to update category:', error);
      set({ error, isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`http://localhost:8080/api/admin/categories/${id}`);
      set(state => ({
        categories: state.categories.filter(cat => cat.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to delete category:', error);
      set({ error, isLoading: false });
    }
  },
}));

export default useCategoryStore;