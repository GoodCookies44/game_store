import React from 'react';

import { Box, Group, Image, Text, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

import { Game } from '../../types/game';

import * as classes from './GameItem.module.css';

export default function GameItem({ game }: { game: Game }) {
  const rating = (game.rating * 2).toFixed(1);
  const date = game.released.split('-')[0];

  return (
    <Box className={classes.container}>
      <Image
        className={classes.image}
        src={game.background_image}
        alt={game.name}
      />

      <Group className={classes.info}>
        <Title order={6} className={classes.title}>
          {game.name}
        </Title>

        <Group className={classes.date}>
          <Group gap="0.1rem">
            <IconDownload size={10} />
            <Text size="xs">{game.added}</Text>
          </Group>

          <Text size="xs">{date} г.</Text>
        </Group>

        <Text size="xs" className={classes.rating}>
          {rating}
        </Text>
      </Group>
    </Box>
  );
}
