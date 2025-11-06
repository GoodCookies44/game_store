// Modules
import React from 'react'
import { Button, Card, Image, Text } from '@mantine/core';
// Components
// Types
import { Game } from '../../types/game';
// Styles
import * as classes from './GameCard.module.css';


type GameCardProps = {
  game: Game;
}

export function GameCard({game}:GameCardProps) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image className={classes.card__img_bcg} src= {game.background_image} alt={game.name} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          {game.name}
        </Text>
        <Button radius="xl" style={{ flex: 1 }}>
            Купить
          </Button>
      </Card.Section>
    </Card>
  );
}