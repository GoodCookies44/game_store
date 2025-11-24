import React from 'react';

import { Box, Divider } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { fetchGenres, fetchTags, sortGames } from '../../api/rawg-client';
import { useGamesInfiniteQuery } from '../../hooks/useGamesInfiniteQuery/useGamesInfiniteQuery';
import { GamesResponse } from '../../types/game';
import FilterGroup from '../FilterGroup/FilterGroup';
import PopularGamesList from '../PopularGamesList/PopularGamesList';

import * as classes from './Aside.module.css';

export default function Aside() {
  const todayDate = new Date().toISOString().split('T')[0];
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const lastDate = lastYear.toISOString().split('T')[0];

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    select: (data) => ({
      ...data,
      results: data.results.filter((genre) => genre.games_count > 0),
    }),
  });

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
    select: (data) => ({
      ...data,
      results: data.results.filter((tag) => tag.games_count > 0),
    }),
  });

  const { data: popularGames } = useGamesInfiniteQuery(
    'popularGames',
    'ordering=-added&dates=' + lastDate + ',' + todayDate,
    {
      initialPageParam: 1,
      getNextPageParam: (
        lastPage: GamesResponse,
        allPages: GamesResponse[]
      ) => {
        const nextPage = allPages.length + 1;
        return lastPage.next && nextPage <= 3 ? nextPage : undefined;
      },
    }
  );

  return (
    <Box className={classes.aside}>
      <FilterGroup
        title="Genres"
        filterType="genres"
        data={genres?.results}
        isLoading={!genres}
      />

      <Divider my="md" orientation="vertical" />

      <FilterGroup
        title="Tags"
        filterType="tags"
        data={tags?.results}
        isLoading={!tags}
        multiple
      />

      <Divider my="md" orientation="vertical" />

      <PopularGamesList
        data={popularGames?.pages?.flatMap((page) => page.results)}
        isLoading={!popularGames}
      />
    </Box>
  );
}
