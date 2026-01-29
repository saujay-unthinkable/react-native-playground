import {
  ApplicationContext,
  defaultContext,
} from "@/services/context/application";
import { getAccessToken } from "@/services/secure-storage";
import React, { ReactNode, useState } from "react";

interface ApplicationProviderProps {
  children: ReactNode;
}

export function ApplicationProvider({ children }: ApplicationProviderProps) {
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(!!getAccessToken());

  const value = {
    hasUserLoggedIn,
    setHasUserLoggedIn,
  };

  return (
    <ApplicationContext.Provider value={{ ...defaultContext, ...value }}>
      {children}
    </ApplicationContext.Provider>
  );
}
