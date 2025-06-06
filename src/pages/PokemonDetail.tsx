import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePokemonStore } from '../store/pokemonStore';
import { pokemonService } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageContainer from '../components/layout/PageContainer';
import PageMetadata from '../components/layout/PageMetadata';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { isCaptured, addPokemon, removePokemon } = usePokemonStore();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      if (!id) return;
      try {
        const data = await pokemonService.getPokemonDetail(parseInt(id));
        setPokemon(data);
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
          types: pokemon.types,
          abilities: pokemon.abilities,
        });
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!pokemon) {
    return (
      <PageContainer>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Pokémon no encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Volver al inicio
          </button>
        </div>
      </PageContainer>
    );
  }

  const isPokemonCaptured = isCaptured(pokemon.id);
  const types = pokemon.types || [];
  const abilities = pokemon.abilities || [];
  const description = `Descubre todo sobre ${pokemon.name}. Altura: ${pokemon.height}, Peso: ${pokemon.weight}. ${types.join(', ')}`;

  return (
    <>
      <PageMetadata 
        title={`${pokemon.name} - Detalles`}
        description={description}
        keywords={[pokemon.name, 'pokemon', 'detalles', ...types]}
        image={pokemon.sprites?.front_default}
      />
      <PageContainer>
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <img
                  src={pokemon.sprites?.front_default}
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
                      {types.map((type) => (
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
                      {abilities.map((ability) => (
                        <span
                          key={ability}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {ability}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isLoggedIn && (
                    <button
                      onClick={handleCapture}
                      className={`w-full py-2 px-4 rounded ${
                        isPokemonCaptured
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white font-semibold`}
                    >
                      {isPokemonCaptured ? 'Liberar' : 'Capturar'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default PokemonDetail; 