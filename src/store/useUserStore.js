// src/store/useStore.js
import create from 'zustand';

const useUserStore = create((set) => ({
  user: {
    name: '',
    email: '',
    role: '',
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: { name: '', email: '', role: '' } }),
}));

export default useUserStore;
