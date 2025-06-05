import { Link } from 'react-router-dom';
import { useAuthStore } from '../App';
import { usePokemonStore } from '../store/pokemonStore';

const MyPokemons = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const capturedPokemons = usePokemonStore((state) => state.capturedPokemons);

  if (!isLoggedIn) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Debes iniciar sesión para ver tus Pokémon
        </h2>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (capturedPokemons.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No has capturado ningún Pokémon aún
        </h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ir a capturar Pokémon
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Mis Pokémon Capturados
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {capturedPokemons.map((pokemon) => (
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
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                Capturado
              </span>
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

export default MyPokemons; 