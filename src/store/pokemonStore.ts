import { create } from 'zustand';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonState {
  capturedPokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  isCaptured: (id: number) => boolean;
}

export const usePokemonStore = create<PokemonState>((set, get) => ({
  capturedPokemons: [],
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