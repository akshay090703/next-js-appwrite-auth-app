import { createContext } from "react";

// Context (informational part of context api)
export const AuthContext = createContext<{
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}>({
  authStatus: false,
  setAuthStatus: () => {},
});

// Provider(Wrapping box where i can put my components)
export const AuthProvider = AuthContext.Provider;

// Custom hook for use the data of the provider
