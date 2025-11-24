import { InfiniteData } from '@tanstack/react-query';

import { Genre, Tag } from './filter';

export type Game = {
  id: number;
  name: string;
  background_image: string;
  clip: string;
  description: string;
  rating: number;
  released: string;
  added: number;
  genres: Genre[];
  tags: Tag[];
  parent_platforms: {
    platform: {
      id: number;
    };
  }[];
};

export type GamesResponse = {
  count: number;
  next: number | null;
  previous: number | null;
  results: Game[];
};

export type GamesListProps = {
  data: Game[] | undefined;
  isLoading?: boolean;
};

export type GamesTabProps = {
  value: string;
  data: InfiniteData<GamesResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
};
