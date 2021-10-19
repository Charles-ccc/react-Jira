import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
// app级别的全局context
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
