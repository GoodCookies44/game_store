import React from 'react';

import { Card, Image, Text } from '@mantine/core';

import { Game } from '../../types/game';

import * as classes from './GameCard.module.css';

export function GameCard({ game }: { game: Game }) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image
          className={classes.image}
          src={game.background_image}
          alt={game.name}
        />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text fz="xl" className={classes.label}>
          {game.name}
        </Text>
      </Card.Section>
    </Card>
  );
}
