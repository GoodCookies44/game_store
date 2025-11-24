import React from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { fetchGameById } from '../../api/rawg-client';
import Layout from '../../components/Layout/Layout';

import * as classes from './GamePage.module.css';

export default function GamePage() {
  const { id } = useParams();

  const { data: game, isLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGameById(id!),
  });

  return (
    <Layout>
      <pre>{JSON.stringify(game, null, 1)}</pre>
    </Layout>
  );
}
