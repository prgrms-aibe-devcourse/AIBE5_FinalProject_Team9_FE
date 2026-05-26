export interface Theme {
  id: number;
  title: string;
  description: string;
  genre: string;
  difficulty: number;    // 1~5
  horrorLevel: number;   // 1~5
  minPlayers: number;
  maxPlayers: number;
  duration: number;      // 분 단위
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  clearRate?: number;
  locationId?: number;
  locationName?: string;
  branchName?: string;
  isBest?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  rank?: number;
  createdAt?: string;
}

export interface ThemeDetail extends Theme {
  story?: string;
  notice?: string;
  availableTimes?: string[];
}

export interface ThemeFilter {
  genre?: string;
  difficulty?: string;
  minPlayers?: number;
  rating?: number;
  locationId?: number;
  sort?: 'popular' | 'rating' | 'newest';
  page?: number;
  size?: number;
}

export interface CreateThemeRequest {
  title: string;
  description: string;
  genre: string;
  difficulty: number;
  horrorLevel: number;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  price: number;
  imageUrl?: string;
}
