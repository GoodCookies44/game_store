import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { Carousel } from '@mantine/carousel';
import { Box, Card, Group, Image, Text, Title } from '@mantine/core';
import { IconDownload, IconPlayerPlay } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import { fetchMovies, fetchScreenshots } from '../../api/rawg-client';
import { Game, GameScreenshots } from '../../types/game';
import PlatformsList from '../PlatformsList/PlatformsList';

import * as classes from './GameCard.module.css';

export function GameCard({ game }: { game: Game }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

  const { data: gameScreenshots } = useQuery({
    queryKey: ['gameScreenshots', game.id],
    queryFn: () => fetchScreenshots(game.id),
  });

  const { data: gameMovies } = useQuery({
    queryKey: ['gameMovies', game.id],
    queryFn: () => fetchMovies(game.id),
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowPoster(false);

    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPoster(true);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

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
          {gameMovies?.results?.[0] && (
            <Carousel.Slide
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              h={129}
            >
              {showPoster && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: '100%' }}
                />
              )}

              <video
                ref={videoRef}
                src={gameMovies.results[0].data.max}
                style={{
                  width: '100%',
                  display: showPoster ? 'none' : 'block',
                }}
                muted
                loop
              />

              {!isHovered && (
                <Box className={classes.iconPlay}>
                  <IconPlayerPlay size={32} color="white" fill="white" />
                </Box>
              )}
            </Carousel.Slide>
          )}

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
