import React from "react";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import FallbackToast from "./components/toast/FallbackToast";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={({ error }) => <FallbackToast error={error} />}
      >
        <Layout />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}; 

export default App;
