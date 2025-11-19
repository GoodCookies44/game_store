import React, { useMemo } from 'react';
import Masonry from 'react-masonry-css';

import { Skeleton } from '@mantine/core';

import { GamesListProps } from '../../types/game';
import { GameCard } from '../GameCard/GameCard';

import * as classes from './GameList.module.css';

export function GamesList({ param, isLoading }: GamesListProps) {
  const skeletonHeigs = useMemo(
    () => Array.from({ length: 15 }, () => Math.random() * 100 + 150),
    []
  );

  const breakpointColumns = {
    default: 3,
    1024: 3,
    768: 2,
  };

  if (isLoading) {
    return (
      <Masonry
        breakpointCols={breakpointColumns}
        className={classes.mansory_container}
        columnClassName={classes.mansory_column}
      >
        {skeletonHeigs.map((height, index) => (
          <Skeleton
            key={index}
            height={height}
            width="15rem"
            radius="md"
            mb="xs"
          />
        ))}
      </Masonry>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={classes.mansory_container}
      columnClassName={classes.mansory_column}
    >
      {param?.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Masonry>
  );
}
