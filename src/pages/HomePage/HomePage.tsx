import React from 'react';
import { useSearchParams } from 'react-router';

import { Tabs } from '@mantine/core';

import Layout from '../../components/Layout/Layout';
import TabsPanel from '../../components/TabsPanel/TabsPanel';
import { useFilteredGamesInfiniteQuery } from '../../hooks/useFilteredGamesInfiniteQuery/useFilteredGamesInfiniteQuery';

import * as classes from './HomePage.module.css';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';

  const handleTabChange = (value: string | null) => {
    if (value) {
      setSearchParams({ tab: value });
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const lastDate = lastYear.toISOString().split('T')[0];

  const {
    data: allGames,
    fetchNextPage: fetchAllGames,
    hasNextPage: hasAllGamesNextPage,
    isFetchingNextPage: isAllGamesFetching,
  } = useFilteredGamesInfiniteQuery('all', '');

  const {
    data: topGames,
    fetchNextPage: fetchTopGames,
    hasNextPage: hasTopGamesNextPage,
    isFetchingNextPage: isTopGamesFetching,
  } = useFilteredGamesInfiniteQuery(
    'top',
    'ordering=-rating&dates=' + lastDate + ',' + todayDate
  );

  const {
    data: newGames,
    fetchNextPage: fetchNewGames,
    hasNextPage: hasNewGamesNextPage,
    isFetchingNextPage: isNewGamesFetching,
  } = useFilteredGamesInfiniteQuery(
    'new',
    'ordering=-released&dates=1950-01-01,' + todayDate
  );

  const {
    data: updatedGames,
    fetchNextPage: fetchUpdatedGames,
    hasNextPage: hasUpdatedGamesNextPage,
    isFetchingNextPage: isUpdatedGamesFetching,
  } = useFilteredGamesInfiniteQuery('updated', 'ordering=-updated');

  return (
    <Layout>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        defaultValue="all"
        component="main"
        w="100%"
        mt="md"
        bg="var(--body-bg)"
      >
        <Tabs.List mb="xs" className={classes.nav}>
          <Tabs.Tab value="all">All games</Tabs.Tab>
          <Tabs.Tab value="top">The best</Tabs.Tab>
          <Tabs.Tab value="new">New games</Tabs.Tab>
          <Tabs.Tab value="updated">Updated</Tabs.Tab>
        </Tabs.List>

        <TabsPanel
          value="all"
          data={allGames}
          fetchNextPage={fetchAllGames}
          hasNextPage={hasAllGamesNextPage}
          isFetchingNextPage={isAllGamesFetching}
        />

        <TabsPanel
          value="top"
          data={topGames}
          fetchNextPage={fetchTopGames}
          hasNextPage={hasTopGamesNextPage}
          isFetchingNextPage={isTopGamesFetching}
        />

        <TabsPanel
          value="new"
          data={newGames}
          fetchNextPage={fetchNewGames}
          hasNextPage={hasNewGamesNextPage}
          isFetchingNextPage={isNewGamesFetching}
        />

        <TabsPanel
          value="updated"
          data={updatedGames}
          fetchNextPage={fetchUpdatedGames}
          hasNextPage={hasUpdatedGamesNextPage}
          isFetchingNextPage={isUpdatedGamesFetching}
        />
      </Tabs>
    </Layout>
  );
}
