import React from 'react';

import {
  Anchor,
  Button,
  Card,
  Chip,
  ColorSchemeScript,
  Group,
  MantineColorsTuple,
  MantineProvider,
  TextInput,
  createTheme,
} from '@mantine/core';

const yellow: MantineColorsTuple = [
  '#fff7e0',
  '#ffeecc',
  '#fcdb9d',
  '#f9c869',
  '#f7b538', // Dark 4
  '#f6ac21',
  '#f6a70e',
  '#db9200', // Light 7
  '#c38100',
  '#a96e00',
];
const light_dark: MantineColorsTuple = [
  '#f4f4f6',
  '#e5e5e5',
  '#c8c8cb', // Light 2
  '#aaaab2', // Light_back 3
  '#90909c',
  '#807f8f',
  '#77778a',
  '#666577',
  '#19191c', // Dark 8
  '#101014', // Dark_back 9
];

const theme = createTheme({
  colors: {
    yellow,
    light_dark,
  },

  primaryColor: 'yellow',
  primaryShade: { light: 7, dark: 4 },

  fontFamily: 'Comfortaa, sans-serif',

  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
  },

  spacing: {
    xs: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },

  radius: {
    xs: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },
  defaultRadius: 'xs',

  breakpoints: {
    mobile_max: '48rem', // 768px
    tablet_max: '62rem', // 992px
    desktop: '75em', // 1200px
  },

  shadows: {
    center_sm: '0 0 7px 0 rgba(0, 0, 0, 0.75)',
  },

  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'hover',
      },
    }),

    Button: Button.extend({
      defaultProps: {
        radius: 'xs',
        variant: 'outline',
        autoContrast: true,
        color: yellow[4],
      },
    }),

    Card: Card.extend({
      defaultProps: {
        shadow: 'lg',
        radius: 'lg',
        withBorder: true,
      },
    }),

    Group: Group.extend({
      defaultProps: {
        gap: 'xs',
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'md',
      },
    }),

    Chip: Chip.extend({
      defaultProps: {
        color: yellow[4],
        variant: 'outline',
        radius: 'xs',
      },
      styles: {
        root: {
          background: '--content-bg',
          paddingInline: 'xs',
        },
      },
    }),
  },
});

export function MantineThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
}
