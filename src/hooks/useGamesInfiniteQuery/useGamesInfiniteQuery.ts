import { useInfiniteQuery } from '@tanstack/react-query';

import { sortGames } from '../../api/rawg-client';
import { GamesResponse } from '../../types/game';

export const useGamesInfiniteQuery = (
  key: string,
  param: string,
  options?: {}
) => {
  return useInfiniteQuery({
    queryKey: ['game', key, param],
    queryFn: ({ pageParam = 1 }) =>
      sortGames({
        pageParam,
        meta: { sortParam: param },
      }),

    initialPageParam: 1,
    getNextPageParam: (lastPage: GamesResponse, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.next ? nextPage : undefined;
    },
    ...options,
  });
};
