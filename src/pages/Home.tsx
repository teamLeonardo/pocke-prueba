import { useState, useEffect } from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonCard from '../components/ui/PokemonCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageMetadata from '../components/layout/PageMetadata';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { pokemons, fetchPokemons } = usePokemonStore();

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        await fetchPokemons();
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, [fetchPokemons]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <PageMetadata 
        title="Inicio"
        description="Explora y captura Pokémon en tu Pokédex personal. Encuentra tus Pokémon favoritos y comienza tu aventura como entrenador."
        keywords={['pokemon', 'pokedex', 'inicio', 'captura', 'entrenador', 'aventura']}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};

export default Home; 