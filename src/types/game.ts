export type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Genre[];
  tags: Tag[];
  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
};

export type GamesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

export type GamesListProps = {
  param: Game[] | undefined;
  isLoading?: boolean;
};

export type Genre = {
  id: number;
  name: string;
  games_count: number;
};

export type GenresResponse = {
  count: number;
  results: Genre[];
};

export type Tag = {
  id: number;
  name: string;
  games_count: number;
};

export type TagsResponse = {
  count: number;
  results: Tag[];
};
