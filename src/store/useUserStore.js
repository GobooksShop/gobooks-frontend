import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import commonStore from './commonStore';

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
      storage: commonStore,
    },
  ),
);

export default useUserStore;
