import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { usePokemonStore } from './pokemonStore';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: '',
      login: (username: string) => set({ isLoggedIn: true, username }),
      logout: () => {
        const { clearPokemonStore } = usePokemonStore.getState();
        clearPokemonStore();
        set({ isLoggedIn: false, username: '' });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 