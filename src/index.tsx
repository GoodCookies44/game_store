// Modules
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
// Components
import { MantineThemeProvider } from "./lib/mantin-theme";
import App from "./App";
// Styles
import "@mantine/core/styles.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <QueryClientProvider client={queryClient}>
    <MantineThemeProvider>
      <App />
    </MantineThemeProvider>
  </QueryClientProvider>
);
