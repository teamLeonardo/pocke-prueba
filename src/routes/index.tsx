import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import RequireAuth from '../components/guards/RequireAuth';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const PokemonDetail = lazy(() => import('../pages/PokemonDetail'));
const MyPokemons = lazy(() => import('../pages/MyPokemons'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetail />,
  },
  {
    path: '/my-pokemons',
    element: (
      <RequireAuth>
        <MyPokemons />
      </RequireAuth>
    ),
  },
]; 