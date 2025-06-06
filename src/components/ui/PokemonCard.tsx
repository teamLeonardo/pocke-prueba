import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';
import Skeleton from './Skeleton';

interface PokemonCardProps {
  pokemon: Pokemon;
  showCaptured?: boolean;
  isCaptured?: boolean;
}

const PokemonCard = ({ pokemon, showCaptured = false, isCaptured = false }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/pokemon/${pokemon.id}`} className="block">
        <div className="relative">
          {!imageLoaded && (
            <Skeleton className="w-full h-48" />
          )}
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={`w-full h-48 object-contain p-4 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {showCaptured && (
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                isCaptured 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
              }`}>
                {isCaptured ? 'Capturado' : 'No capturado'}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 capitalize">{pokemon.name}</h3>
          {showCaptured && (
            <p className="text-sm text-gray-600 mt-1">
              ID: #{pokemon.id.toString().padStart(3, '0')}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard; 