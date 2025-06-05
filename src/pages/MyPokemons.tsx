import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonCard from '../components/ui/PokemonCard';
import PageMetadata from '../components/layout/PageMetadata';

const MyPokemons = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { capturedPokemons } = usePokemonStore();

  if (!isLoggedIn) {
    return (
      <>
        <PageMetadata 
          title="Acceso Denegado"
          description="Necesitas iniciar sesión para ver tus Pokémon capturados"
          keywords={['pokemon', 'acceso', 'login', 'entrenador']}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Acceso Denegado</h2>
          <p className="mb-4">Necesitas iniciar sesión para ver tus Pokémon capturados</p>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Iniciar Sesión
          </Link>
        </div>
      </>
    );
  }

  if (capturedPokemons.length === 0) {
    return (
      <>
        <PageMetadata 
          title="Mis Pokémon"
          description="Aún no has capturado ningún Pokémon. ¡Comienza tu aventura!"
          keywords={['pokemon', 'captura', 'entrenador', 'colección']}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No tienes Pokémon capturados</h2>
          <p className="mb-4">¡Comienza a capturar Pokémon para verlos aquí!</p>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Ir a la lista de Pokémon
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMetadata 
        title="Mis Pokémon"
        description={`Tu colección personal de ${capturedPokemons.length} Pokémon capturados`}
        keywords={['pokemon', 'colección', 'captura', 'entrenador', 'mis pokemon']}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {capturedPokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} showCaptured={true} isCaptured={true} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyPokemons; 