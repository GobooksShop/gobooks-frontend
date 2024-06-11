import axios from 'axios';
import create from 'zustand';

const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories'); 
      set({ categories: response.data }); 
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },
}));

export default useCategoryStore;
