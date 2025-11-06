import React from 'react'
import { Anchor, ColorSchemeScript, createTheme, MantineColorsTuple, MantineProvider} from "@mantine/core";

const yellow: MantineColorsTuple = [
  "#fff7e0",
  "#ffeecc",
  "#fcdb9d",
  "#f9c869",
  "#f7b538", // Main
  "#f6ac21",
  "#f6a70e",
  "#db9200",
  "#c38100",
  "#a96e00"
];
const light_dark: MantineColorsTuple = [
  "#fef2f5",
  "#eae6e7", // Light
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#6e6e6e", // Dark
  "#676465",
  "#5e5457"
];

const theme = createTheme({
  fontFamily: 'Comfortaa, sans-serif',

  colors:{
    yellow,
    light_dark
  },
  
  primaryColor: 'yellow',
  
  shadows: {
    md: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    xl: '0px 8px 24px rgba(0, 0, 0, 0.15)',
  },
  
  radius: {
  md: '8px',
  lg: '12px',
},

 components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'hover',
      },
    }),
  },
});

export function MantineThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
}