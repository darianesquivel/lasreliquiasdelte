import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { ToastContainer } from "react-toastify";

import { useThemeStore } from "./store/theme-store";

const queryClient = new QueryClient();

function Root() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Theme appearance={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ToastContainer theme={theme} />
        </BrowserRouter>
      </QueryClientProvider>
    </Theme>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
