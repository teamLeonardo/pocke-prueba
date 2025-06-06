import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, username, logout } = useAuthStore();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Inicio' },
        { path: '/my-pokemons', label: 'Mis Pokémon', requiresAuth: true },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo y nombre */}
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                            Pokédex
                        </Link>
                    </div>

                    {/* Enlaces de navegación - Desktop */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        {navLinks.map((link) => (
                            (!link.requiresAuth || isLoggedIn) && (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    Bienvenido, <span className="font-semibold">{username}</span>
                                </span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ${isActive('/login') ? 'bg-blue-700' : ''
                                    }`}
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>

                    {/* Botón de menú móvil */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menú</span>
                            {/* Icono de menú */}
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Icono de cerrar */}
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        (!link.requiresAuth || isLoggedIn) && (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                    {isLoggedIn ? (
                        <>
                            <div className="px-3 py-2 text-sm text-gray-600">
                                Bienvenido, <span className="font-semibold">{username}</span>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className={`block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 ${isActive('/login') ? 'bg-blue-700' : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 