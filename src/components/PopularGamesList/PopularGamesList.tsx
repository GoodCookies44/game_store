import React, { useEffect, useRef } from 'react';

import { Box, Group, Skeleton, Title } from '@mantine/core';
import { useVirtualizer } from '@tanstack/react-virtual';

import { GamesListProps } from '../../types/game';
import GameItem from '../GameItem/GameItem';

import * as classes from './PopularGamesList.module.css';

export default function PopularGamesList({ data, isLoading }: GamesListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    enabled: !isLoading,
  });

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
      <Box ref={parentRef} className={classes.itemsContainer}>
        <Box
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <Box
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '19rem',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {data?.[virtualItem.index] && (
                <GameItem game={data[virtualItem.index]} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
