export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types?: Array<{ type: { name: string } }>;
  abilities?: Array<{ ability: { name: string } }>;
  base_experience?: number;
  height?: number;
  weight?: number;
  sprites?: {
    front_default: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
} 