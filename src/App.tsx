import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { create } from 'zustand';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemons from './pages/MyPokemons';

// Definición del store con Zustand
interface AuthState {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: '',
  login: (username: string) => set({ isLoggedIn: true, username }),
  logout: () => set({ isLoggedIn: false, username: '' }),
}));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/my-pokemons" element={<MyPokemons />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
