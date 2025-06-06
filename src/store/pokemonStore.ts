import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { pokemonService } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';

interface PokemonListParams {
  limit?: number;
  offset?: number;
}

interface PokemonState {
  pokemons: Pokemon[];
  capturedPokemons: Pokemon[];
  currentPage: number;
  totalPages: number;
  fetchPokemons: (params?: PokemonListParams) => Promise<void>;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  isCaptured: (id: number) => boolean;
  clearPokemonStore: () => void;
  setPage: (page: number) => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set, get) => ({
      pokemons: [],
      capturedPokemons: [],
      currentPage: 1,
      totalPages: 1,
      fetchPokemons: async (params) => {
        const { pokemons, totalPages } = await pokemonService.getPokemonList(params);
        set({ pokemons, totalPages });
      },
      addPokemon: (pokemon) =>
        set((state) => ({
          capturedPokemons: [...state.capturedPokemons, pokemon],
        })),
      removePokemon: (id) =>
        set((state) => ({
          capturedPokemons: state.capturedPokemons.filter((p) => p.id !== id),
        })),
      isCaptured: (id) => {
        const state = get();
        return state.capturedPokemons.some((p) => p.id === id);
      },
      clearPokemonStore: () => {
        set({ pokemons: [], capturedPokemons: [], currentPage: 1, totalPages: 1 });
      },
      setPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'pokemon-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ capturedPokemons: state.capturedPokemons }),
    }
  )
); 