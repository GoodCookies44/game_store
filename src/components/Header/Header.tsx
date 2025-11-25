import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Box,
  Burger,
  Button,
  Group,
  Menu,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoon, IconSearch, IconSun } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import { searchGame } from '../../api/rawg-client';
import { Game } from '../../types/game';
import GameItem from '../GameItem/GameItem';

import * as classes from './Header.module.css';

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: games = [] } = useQuery({
    queryKey: ['game-search', searchQuery],
    queryFn: () => searchGame(searchQuery),
  });

  const handleGameSelect = (gameName: string) => {
    const selectedGame = games.find((game: Game) => game.name === gameName);
    if (selectedGame) {
      navigate(`/game/${selectedGame.id}`);
    }
  };

  const autocompleteData = games.map((game: Game) => ({
    value: game.name,
    game: game,
    label: game.name,
  }));

  return (
    <Group component="header" justify="center" gap="lg">
      <Box className={classes.disclaimer} py="xs">
        <Title order={2}>
          Этот сайт создан с использованием API{' '}
          <Anchor
            size="calc(1.625rem * 1)"
            fw="700"
            href="https://rawg.io/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            RAWG.io
          </Anchor>
        </Title>
      </Box>

      <Group className={classes.container} justify="space-between" px="sm">
        <Link to={'/'} className={classes.link}>
          <Title order={3}>GameStore</Title>
        </Link>

        <Group justify="flex-end">
          <Autocomplete
            style={{
              '--input-bg': 'var(--content-bg)',
            }}
            className="searh__input"
            placeholder="Searching for games..."
            leftSection={<IconSearch size={16} />}
            flex={1}
            maw={500}
            mx="xs"
            data={autocompleteData}
            value={searchQuery}
            onChange={setSearchQuery}
            onOptionSubmit={handleGameSelect}
            limit={5}
            renderOption={({ option }) => <GameItem game={option.game} />}
          />

          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => toggleColorScheme()}
            title="Переключить тему"
          >
            {colorScheme === 'dark' ? (
              <IconSun size={20} color="#f7b538" />
            ) : (
              <IconMoon size={20} color="#1d488b" />
            )}
          </ActionIcon>

          <Group visibleFrom="mobile_max">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Box hiddenFrom="mobile_max">
            <Menu>
              <Menu.Target>
                <Burger opened={opened} onClick={toggle} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Log in</Menu.Item>
                <Menu.Item>Sign up</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Group>
      </Group>
    </Group>
  );
}
