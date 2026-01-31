import React from "react";

import { Config } from "@/configs";
import { AuthContextType } from "./typings";

export const defaultContext: AuthContextType = {
  theme: Config.defaultTheme as string,
  toggleTheme: () => {},
  isAuthLoading: true,
  hasUserLoggedIn: false,
  setHasUserLoggedIn: () => {},
  authenticateUser: async () => {},
  logoutUser: async () => {},
};

export const AuthContext = React.createContext<AuthContextType>(defaultContext);

export const useAuth = () => {
  return React.useContext(AuthContext);
};
