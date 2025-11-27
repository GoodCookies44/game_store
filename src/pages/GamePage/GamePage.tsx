import React from 'react';
import { useParams } from 'react-router';

import { Group, Image, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { fetchGameById, fetchScreenshots } from '../../api/rawg-client';
import Layout from '../../components/Layout/Layout';

import * as classes from './GamePage.module.css';

export default function GamePage() {
  const { id } = useParams<{ id: string }>();

  const { data: game, isLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGameById(id!),
    enabled: !!id,
  });

  const { data: screenshots } = useQuery({
    queryKey: ['screenshots', game?.id],
    queryFn: () => fetchScreenshots(game?.id),
  });

  return (
    <Layout>
      <Group component="main" className={classes.container}>
        <Image w="50%" h="50%" src={game?.background_image} alt={game?.name} />
        <Title order={2}>{game?.name}</Title>
        <Text>{game?.description}</Text>
        <Group>{}</Group>
      </Group>
    </Layout>
  );
}
