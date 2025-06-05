import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PageMetadata from '../components/layout/PageMetadata';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/');
    }
  };

  return (
    <>
      <PageMetadata 
        title="Iniciar Sesión"
        description="Inicia sesión en tu Pokédex personal para comenzar a capturar Pokémon"
        keywords={['pokemon', 'login', 'entrenador', 'iniciar sesión', 'pokedex']}
      />
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login; 