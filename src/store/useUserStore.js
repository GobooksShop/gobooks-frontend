import { create } from 'zustand';
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
      name: 'userStore',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      serialize: (state) => {
        return JSON.stringify(state);
      },
      deserialize: (str) => {
        return JSON.parse(str);
      },
    },
  ),
);

export default useUserStore;
