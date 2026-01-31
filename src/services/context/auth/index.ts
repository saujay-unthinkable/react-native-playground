import React from "react";

import { Config } from "@/configs";
import { AuthType } from "./typings";

export const defaultContext: AuthType = {
  theme: Config.defaultTheme as string,
  toggleTheme: () => {},
  hasUserLoggedIn: false,
  setHasUserLoggedIn: () => {},
  authenticateUser: async () => {},
  logoutUser: async () => {},
};

export const AuthContext = React.createContext<AuthType>(defaultContext);

export const useAuth = () => {
  return React.useContext(AuthContext);
};
