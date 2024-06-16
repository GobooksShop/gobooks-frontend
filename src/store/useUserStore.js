import commonStore from './commonStore';
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
        addresses: [],
      },
      setUser: (user) => set({ user }),
      setAddresses: (addresses) =>
        set((state) => ({ user: { ...state.user, addresses } })),
      clearUser: () =>
        set({
          user: {
            userId: '',
            name: '',
            email: '',
            role: '',
            addresses: [],
          },
        }),
    }),
    {
      name: 'userStore',
      storage: commonStore,
    },
  ),
);

export default useUserStore;
