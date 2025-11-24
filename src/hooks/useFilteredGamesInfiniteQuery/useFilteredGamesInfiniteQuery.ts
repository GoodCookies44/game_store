import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { GamesResponse } from '../../types/game';
import { useGamesInfiniteQuery } from '../useGamesInfiniteQuery/useGamesInfiniteQuery';

export const useFilteredGamesInfiniteQuery = (key: string, param: string) => {
  const selectedGenres = useSelector(
    (state: RootState) => state.filters.genres
  );
  const selectedTags = useSelector((state: RootState) => state.filters.tags);

  const buildSortParam = () => {
    const params = [param];

    if (selectedGenres.length > 0) {
      params.push(`genres=${selectedGenres.join(',')}`);
    }

    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        params.push(`tags=${tag}`);
      });
    }

    return params.join('&');
  };

  return useGamesInfiniteQuery(key, buildSortParam(), {
    getNextPageParam: (lastPage: GamesResponse, allPages: GamesResponse[]) => {
      const nextPage = allPages.length + 1;
      return lastPage.next && nextPage <= 3 ? nextPage : undefined;
    },
  });
};
