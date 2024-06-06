// src/store/useStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

// const useUserStore = create((set) => ({
// user: {
//   name: '',
//   email: '',
//   role: '',
// },

// setUser: (user) => set({ user }),
// clearUser: () => set({ user: { name: '', email: '', role: '' } }),

// }));

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        name: '',
        email: '',
        role: '',
      },
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: { name: '', email: '', role: '' } }),
    }),
    {
      name: 'user-storage', // 로컬 스토리지에 저장될 키
      getStorage: () => localStorage, // 기본값: localStorage
    },
  ),
);

export default useUserStore;
