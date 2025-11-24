import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Tabs } from '@mantine/core';

import { RootState } from '../../store';
import { Genre, Tag } from '../../types/filter';
import { Game, GamesTabProps } from '../../types/game';
import { GamesList } from '../GameList/GameList';

import * as classes from './TabsPanel.module.css';

export default function TabsPanel(props: GamesTabProps) {
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
    <Tabs.Panel value={props.value} className={classes.container}>
      <GamesList
        data={filterGames(props.data?.pages.flatMap((page) => page.results))}
        isLoading={!props.data?.pages?.[0]?.results}
      ></GamesList>

      <Button
        className={classes.button}
        onClick={() => props.fetchNextPage()}
        disabled={!props.hasNextPage || props.isFetchingNextPage}
        loading={props.isFetchingNextPage}
      >
        Show more
      </Button>
    </Tabs.Panel>
  );
}
