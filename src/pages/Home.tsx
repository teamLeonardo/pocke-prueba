import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../App';
import { usePokemonStore } from '../store/pokemonStore';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isCaptured = usePokemonStore((state) => state.isCaptured);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
        );
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon: any, index: number) => {
            const id = index + 1;
            return {
              id,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
            };
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lista de Pokémon
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-48 object-contain p-4"
              />
              {isLoggedIn && isCaptured(pokemon.id) && (
                <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  Capturado
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center text-gray-800 capitalize">
                {pokemon.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 