import React from 'react';

import { Box, Group } from '@mantine/core';

import Aside from '../Aside/Aside';

import * as classes from './Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Group align="flex-start" wrap="nowrap" gap="md">
      <Box style={{ flex: 1 }}>{children}</Box>

      <Aside />
    </Group>
  );
}
