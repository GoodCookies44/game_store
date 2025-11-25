import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Carousel } from '@mantine/carousel';
import { Card, Group, Image, Text, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import { fetchScreenshots } from '../../api/rawg-client';
import { Game, GameScreenshots } from '../../types/game';
import PlatformsList from '../PlatformsList/PlatformsList';

import * as classes from './GameCard.module.css';

export function GameCard({ game }: { game: Game }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

  const { data: gameScreenshots } = useQuery({
    queryKey: ['gameScreenshots', game.id],
    queryFn: () => fetchScreenshots(game.id),
  });

  const rating = Number((game.rating * 2).toFixed(1));
  const ratingColor = useMemo(() => {
    if (rating > 7) return '#0d571a';
    if (rating == 0) return '#101014';
    if (rating < 7) return '#a68408';
  }, [rating]);
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Carousel
          className={classes.carousel}
          withControls={false}
          withIndicators
        >
          <Carousel.Slide>
            <Image src={game.background_image} alt={game.name} />
          </Carousel.Slide>
          {gameScreenshots?.results?.map((screenshot: GameScreenshots) => (
            <Carousel.Slide key={screenshot.id}>
              <Image src={screenshot.image} alt={game.name} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>

      <Card.Section className={classes.section} onClick={handleClick}>
        <PlatformsList game={game} size={14} />

        <Title className={classes.label}>{game.name}</Title>

        <Group className={classes.subInfo}>
          <Text
            className={classes.rating}
            style={{ backgroundColor: ratingColor }}
          >
            {rating}
          </Text>

          <Group className={classes.added}>
            <IconDownload size={14} />
            <Text size="sm">{game.added}</Text>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
