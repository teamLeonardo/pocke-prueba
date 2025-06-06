import axios from 'axios';
import type { Pokemon } from '../types/pokemon';

// const BASE_URL = 'https://pokeapi.co/api/v2';
const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
// 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// Configuración base de Axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error de API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Error de red:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Función para extraer el ID de la URL del Pokémon
const extractPokemonId = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1]) : 0;
};

// Función para mezclar array (Fisher-Yates shuffle)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const pokemonService = {
  async getPokemonList({ limit = 20, offset = 0 }: { limit?: number; offset?: number } = {}): Promise<{ pokemons: Pokemon[]; totalPages: number }> {
    try {
      const { data } = await api.get<PokemonListResponse>('/pokemon', {
        params: { limit, offset }
      });

      const pokemonList = data.results.map((pokemon) => {
        const id = extractPokemonId(pokemon.url);
        return {
          id,
          name: pokemon.name,
          image: `${IMAGE_BASE_URL}/${id}.svg`,
          types: [],
          abilities: [],
        };
      });

      return {
        pokemons: shuffleArray(pokemonList),
        totalPages: Math.ceil(data.count / limit)
      };
    } catch (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
      throw error;
    }
  },

  async getPokemonDetail(id: number): Promise<Pokemon> {
    try {
      const { data } = await api.get(`/pokemon/${id}`);
      
      return {
        id: data.id,
        name: data.name,
        image: `${IMAGE_BASE_URL}/${data.id}.svg`,
        types: data.types.map((type: PokemonType) => type.type.name),
        abilities: data.abilities.map((ability: PokemonAbility) => ability.ability.name),
        height: data.height,
        weight: data.weight,
        sprites: data.sprites,
      };
    } catch (error) {
      console.error('Error al obtener detalles del Pokémon:', error);
      throw error;
    }
  },
}; 