import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../App';
import { usePokemonStore } from '../store/pokemonStore';

interface PokemonDetail {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  base_experience: number;
  image: string;
}

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { isCaptured, addPokemon, removePokemon } = usePokemonStore();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = response.data;
        setPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map((type: any) => type.type.name),
          abilities: data.abilities.map((ability: any) => ability.ability.name),
          base_experience: data.base_experience,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`,
        });
      } catch (error) {
        console.error('Error fetching pokemon detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  const handleCapture = () => {
    if (pokemon) {
      if (isCaptured(pokemon.id)) {
        removePokemon(pokemon.id);
      } else {
        addPokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Pokémon no encontrado</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 capitalize">
              {pokemon.name}
            </h1>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Tipos</h2>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Experiencia Base</h2>
                <p className="text-gray-600">{pokemon.base_experience}</p>
              </div>
              {isLoggedIn && (
                <button
                  onClick={handleCapture}
                  className={`w-full py-2 px-4 rounded ${
                    isCaptured(pokemon.id)
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-semibold`}
                >
                  {isCaptured(pokemon.id) ? 'Liberar' : 'Capturar'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail; 