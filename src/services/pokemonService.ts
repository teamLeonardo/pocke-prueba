import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '../models/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

export const pokemonService = {
  async getPokemonList(limit: number = 20, offset: number = 0): Promise<Pokemon[]> {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      
      return response.data.results.map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name,
        image: `${IMAGE_BASE_URL}/${offset + index + 1}.svg`,
      }));
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw error;
    }
  },

  async getPokemonDetail(id: number): Promise<Pokemon> {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
      const data = response.data;
      
      return {
        id: data.id,
        name: data.name,
        image: `${IMAGE_BASE_URL}/${data.id}.svg`,
        types: data.types,
        abilities: data.abilities,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        sprites: {
          front_default: data.sprites.front_default
        }
      };
    } catch (error) {
      console.error('Error fetching pokemon detail:', error);
      throw error;
    }
  },
}; 