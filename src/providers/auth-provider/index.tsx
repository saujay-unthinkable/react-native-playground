import {
  ApplicationContext,
  defaultContext,
} from "@/services/context/application";
import {
  getAccessToken,
  removeUserData,
  setAccessToken,
  setRefreshToken,
} from "@/services/secure-storage";
import React, { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState<boolean>(false);

  const authenticateUser = async (
    accessToken?: string,
    refreshToken?: string,
  ) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setHasUserLoggedIn(true);
  };

  const logoutUser = async () => {
    setHasUserLoggedIn(false);
    removeUserData();
  };

  useEffect(() => {
    try {
      const token = getAccessToken();
      console.log("Access Token:", token);
      setHasUserLoggedIn(!!token);
    } catch (error) {
      console.error("Error reading auth token:", error);
      setHasUserLoggedIn(false);
    }
  }, []);

  const value = {
    hasUserLoggedIn,
    setHasUserLoggedIn,
    authenticateUser,
    logoutUser,
  };

  return (
    <ApplicationContext.Provider value={{ ...defaultContext, ...value }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default AuthProvider;
