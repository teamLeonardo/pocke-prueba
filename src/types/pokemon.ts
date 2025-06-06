export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  height?: number;
  weight?: number;
  sprites?: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
} 