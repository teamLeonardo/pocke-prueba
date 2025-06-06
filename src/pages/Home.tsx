import { useState, useEffect } from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonCard from '../components/ui/PokemonCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageMetadata from '../components/layout/PageMetadata';
import Pagination from '../components/ui/Pagination';

const ITEMS_PER_PAGE = 20;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { pokemons, fetchPokemons, isCaptured, currentPage, totalPages, setPage } = usePokemonStore();

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        await fetchPokemons({
          limit: ITEMS_PER_PAGE,
          offset: (currentPage - 1) * ITEMS_PER_PAGE
        });
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, [fetchPokemons, currentPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        title="Inicio"
        description="Explora y captura Pokémon en tu Pokédex personal. Encuentra tus Pokémon favoritos y comienza tu aventura como entrenador."
        keywords={['pokemon', 'pokedex', 'inicio', 'captura', 'entrenador', 'aventura']}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            showCaptured={true}
            isCaptured={isCaptured(pokemon.id)}
          />
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home; 