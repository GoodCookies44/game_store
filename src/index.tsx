import React from 'react';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { MantineThemeProvider } from './lib/mantin-theme';
import { queryClient } from './lib/react-query';

import './global.module.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <QueryClientProvider client={queryClient}>
    <MantineThemeProvider>
      <App />
    </MantineThemeProvider>
  </QueryClientProvider>
);
