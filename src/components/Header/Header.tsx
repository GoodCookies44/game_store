import React from 'react';

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

import * as classes from './Header.module.css';

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();

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
        <Title order={3}>GameStore</Title>

        <Group justify="flex-end">
          <Autocomplete
            style={{
              '--input-bg': 'var(--content-bg)',
            }}
            className="searh__input"
            placeholder="Поиск игр..."
            leftSection={<IconSearch size={16} />}
            flex={1}
            maw={500}
            mx="xs"
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
            <Button variant="default">Войти</Button>
            <Button>Регистрация</Button>
          </Group>

          <Box hiddenFrom="mobile_max">
            <Menu>
              <Menu.Target>
                <Burger opened={opened} onClick={toggle} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Войти</Menu.Item>
                <Menu.Item>Регистрация</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Group>
      </Group>
    </Group>
  );
}
