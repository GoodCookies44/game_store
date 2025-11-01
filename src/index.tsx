// Modules
import React from "react";
import {createRoot} from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from './lib/react-query'; 
// Components
import App from './App'
// Styles
import '@mantine/core/styles.css'


const container = document.getElementById('root')
const root = createRoot(container!)

root.render(  
<QueryClientProvider client={queryClient}>
    <MantineProvider>
      <App/>
    </MantineProvider>
</QueryClientProvider>
)