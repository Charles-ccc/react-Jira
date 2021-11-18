import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";
// app级别的全局context
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
