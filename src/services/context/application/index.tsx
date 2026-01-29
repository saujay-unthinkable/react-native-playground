import React from "react";

import { Config } from "@/configs";
import { ApplicationType } from "./typings";

export const defaultContext: ApplicationType = {
  theme: Config.defaultTheme as string,
  toggleTheme: () => {},
  hasUserLoggedIn: false,
  setHasUserLoggedIn: () => {},
};

export const ApplicationContext =
  React.createContext<ApplicationType>(defaultContext);

export const useApplication = () => {
  return React.useContext(ApplicationContext);
};
