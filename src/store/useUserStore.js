import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        userId: '',
        name: '',
        email: '',
        role: '',
      },
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({ user: { userId: '', name: '', email: '', role: '' } }),
    }),
    {
      name: 'userStore', // 로컬 스토리지에 저장될 키
      getStorage: () => localStorage, // 기본값: localStorage
    },
  ),
);

export default useUserStore;
