import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../api/category/categoryApi';

import { create } from 'zustand';

const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const categories = await fetchCategories();
      set({ categories, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      set({ error, isLoading: false });
    }
  },

  addCategory: async (category) => {
    set({ isLoading: true });
    try {
      const newCategory = await addCategory(category);
      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to add category:', error);
      set({ error, isLoading: false });
    }
  },

  updateCategory: async (id, category) => {
    set({ isLoading: true });
    try {
      const updatedCategory = await updateCategory(id, category);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updatedCategory : cat,
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to update category:', error);
      set({ error, isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true });
    try {
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to delete category:', error);
      set({ error, isLoading: false });
    }
  },
}));

export default useCategoryStore;
