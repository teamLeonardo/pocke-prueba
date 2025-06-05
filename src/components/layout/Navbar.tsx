import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuthStore();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">
              Pokédex
            </Link>
            <Link to="/" className="hover:text-blue-200">
              Inicio
            </Link>
            {isLoggedIn && (
              <Link to="/my-pokemons" className="hover:text-blue-200">
                Mis Pokémon
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Bienvenido, {username}</span>
                <button
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 