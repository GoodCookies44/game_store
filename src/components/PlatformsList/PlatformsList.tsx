import React from 'react';

import { Group } from '@mantine/core';
import { IconBrandWindowsFilled } from '@tabler/icons-react';

import { IconPlaystationFilled } from '../../UI/icons/IconPlaystationFilled';
import { IconXBoxFilled } from '../../UI/icons/IconXBoxFilled';
import { Game } from '../../types/game';

export default function PlatformsList({
  game,
  size = 24,
  color = 'currentColor',
}: {
  game: Game;
  size?: number;
  color?: string;
}) {
  const platformId = game.parent_platforms?.map((p) => p.platform.id) || [];

  return (
    <Group>
      {platformId.includes(1) && (
        <IconBrandWindowsFilled size={size} color={color} />
      )}
      {platformId.includes(2) && (
        <IconPlaystationFilled size={size} color={color} />
      )}
      {platformId.includes(3) && <IconXBoxFilled size={size} color={color} />}
    </Group>
  );
}
