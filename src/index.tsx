import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import '@mantine/core/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { MantineThemeProvider } from './lib/mantin-theme';
import { queryClient } from './lib/react-query';
import { store } from './store';

import './global.module.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineThemeProvider>
          <App />
        </MantineThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
