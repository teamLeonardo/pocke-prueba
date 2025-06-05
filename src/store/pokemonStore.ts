import { create } from 'zustand';
import { pokemonService } from '../services/pokemonService';
import type { Pokemon } from '../models/Pokemon';

interface PokemonState {
  pokemons: Pokemon[];
  capturedPokemons: Pokemon[];
  fetchPokemons: () => Promise<void>;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  isCaptured: (id: number) => boolean;
}

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  capturedPokemons: [],
  fetchPokemons: async () => {
    const data = await pokemonService.getPokemonList();
    set({ pokemons: data });
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
})); 