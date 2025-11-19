import React, { useEffect } from 'react';

import { Box, Group, Skeleton, Title } from '@mantine/core';

import { GamesListProps } from '../../types/game';
import GameItem from '../GameItem/GameItem';

import * as classes from './PopularGamesList.module.css';

export default function PopularGamesList({ param, isLoading }: GamesListProps) {
  if (isLoading) {
    return (
      <Box component="section">
        <Title order={3} mt={0} mb="xs" mr={0} ml={0} className={classes.title}>
          Популярные игры
        </Title>
        <Group className={classes.itemsContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Group key={index} className={classes.skeleton_container}>
              <Skeleton h={100} w={80} radius="xs" />
              <Skeleton h={32} w={150} radius="xs" />
            </Group>
          ))}
        </Group>
      </Box>
    );
  }

  return (
    <Box component="section">
      <Title order={3} mt={0} mb="xs" mr={0} ml={0} className={classes.title}>
        Популярные игры
      </Title>
      <Group className={classes.itemsContainer}>
        {param?.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </Group>
    </Box>
  );
}
