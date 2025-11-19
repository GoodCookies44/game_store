import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Divider, Group, Tabs } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { fetchGenres, fetchTags, sortGames } from '../../api/rawg-client';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import { GamesList } from '../../components/GameList/GameList';
import PopularGamesList from '../../components/PopularGamesList/PopularGamesList';
import { RootState } from '../../store';
import { Game, Genre, Tag } from '../../types/game';

import * as classes from './HomePage.module.css';

export default function HomePage() {
  const todayDate = new Date().toISOString().split('T')[0];
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const lastDate = lastYear.toISOString().split('T')[0];

  const { data: newGames } = useQuery({
    queryKey: ['games', 'new'],
    queryFn: () =>
      sortGames('ordering=-released&dates=1950-01-01,' + todayDate),
  });

  const { data: updatedGames } = useQuery({
    queryKey: ['games', 'updated'],
    queryFn: () => sortGames('ordering=-updated'),
  });

  const { data: topGames } = useQuery({
    queryKey: ['games', 'top'],
    queryFn: () =>
      sortGames('ordering=-rating&dates=' + lastDate + ',' + todayDate),
  });

  const { data: popularGames } = useQuery({
    queryKey: ['games', 'popular'],
    queryFn: () =>
      sortGames('ordering=-added&dates=' + lastDate + ',' + todayDate),
  });

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  const selectedGenres = useSelector(
    (state: RootState) => state.filters.genres
  );
  const selectedTags = useSelector((state: RootState) => state.filters.tags);

  const filterGames = (games: Game[] | undefined) => {
    return games?.filter(
      (game) =>
        (selectedGenres.length === 0 ||
          game.genres?.some((genre: Genre) =>
            selectedGenres.includes(genre.id.toString())
          )) &&
        (selectedTags.length === 0 ||
          game.tags?.some((tag: Tag) =>
            selectedTags.includes(tag.id.toString())
          ))
    );
  };

  return (
    <Tabs
      defaultValue="Top"
      w="100%"
      component="main"
      mt="md"
      bg="var(--body-bg)"
    >
      <Tabs.List mb="xs" fw="700" className={classes.nav}>
        <Tabs.Tab value="Top">Лучшие</Tabs.Tab>
        <Tabs.Tab value="New">Новинки</Tabs.Tab>
        <Tabs.Tab value="Update">Обновления</Tabs.Tab>
      </Tabs.List>

      <Group align="flex-start" wrap="nowrap">
        <Box style={{ flex: 1 }} className={classes.container}>
          <Tabs.Panel value="Top">
            <GamesList
              param={filterGames(topGames?.results)}
              isLoading={!topGames}
            ></GamesList>
          </Tabs.Panel>

          <Tabs.Panel value="New">
            <GamesList
              param={filterGames(newGames?.results)}
              isLoading={!newGames}
            ></GamesList>
          </Tabs.Panel>

          <Tabs.Panel value="Update">
            <GamesList
              param={filterGames(updatedGames?.results)}
              isLoading={!updatedGames}
            ></GamesList>
          </Tabs.Panel>
        </Box>

        <Box className={classes.aside}>
          <FilterGroup
            title="Жанры"
            filterType="genres"
            data={genres?.results}
            isLoading={!genres}
          />

          <Divider my="md" orientation="vertical" />

          <FilterGroup
            title="Категории"
            filterType="tags"
            data={tags?.results}
            isLoading={!tags}
          />

          <Divider my="md" orientation="vertical" />

          <PopularGamesList
            param={popularGames?.results}
            isLoading={!popularGames}
          />
        </Box>
      </Group>
    </Tabs>
  );
}
