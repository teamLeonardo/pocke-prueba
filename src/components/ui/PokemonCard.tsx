import { Link } from 'react-router-dom';
import type { Pokemon } from '../../models/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  showCaptured?: boolean;
  isCaptured?: boolean;
}

const PokemonCard = ({ pokemon, showCaptured = false, isCaptured = false }: PokemonCardProps) => {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-48 object-contain p-4"
        />
        {showCaptured && isCaptured && (
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
  );
};

export default PokemonCard; 