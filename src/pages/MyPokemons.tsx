import { useEffect, useState } from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonCard from '../components/ui/PokemonCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageMetadata from '../components/layout/PageMetadata';

const MyPokemons = () => {
  const [loading, setLoading] = useState(true);
  const { capturedPokemons, fetchPokemons } = usePokemonStore();

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        await fetchPokemons();
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, [fetchPokemons]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageMetadata 
        title="Mis Pokémon"
        description="Gestiona tu colección de Pokémon capturados. Libera o mantén tus Pokémon favoritos."
        keywords={['pokemon', 'mis pokemon', 'colección', 'capturados', 'pokedex']}
      />
      {capturedPokemons.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No tienes Pokémon capturados
          </h2>
          <p className="text-gray-600">
            ¡Comienza tu aventura capturando algunos Pokémon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {capturedPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              showCaptured={true}
              isCaptured={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPokemons; 