import { AuthContext, defaultContext } from "@/services/context/auth";
import {
  getAccessToken,
  removeUserData,
  setAccessToken,
  setRefreshToken,
} from "@/services/secure-storage";
import React, { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isTokenAvailable = !!getAccessToken();
  const [hasUserLoggedIn, setHasUserLoggedIn] =
    useState<boolean>(isTokenAvailable);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const authenticateUser = async (
    accessToken?: string,
    refreshToken?: string,
  ) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setHasUserLoggedIn(true);
    console.log("[authenticateUser] - Credentials stored.");
  };

  const logoutUser = async () => {
    setHasUserLoggedIn(false);
    removeUserData();
    console.log("[authenticateUser] - Credentials removed.");
  };

  useEffect(() => {
    const bootstrap = async () => {
      console.log("Bootstrapping <AuthProvider/>");
      try {
        const token = getAccessToken();
        setHasUserLoggedIn(!!token);
      } catch (error) {
        console.error("Error reading auth token:", error);
        setHasUserLoggedIn(false);
      } finally {
        setIsAuthLoading(false);
      }
    };

    bootstrap();
  }, []);

  if (isAuthLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const value = {
    hasUserLoggedIn,
    setHasUserLoggedIn,
    authenticateUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={{ ...defaultContext, ...value }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
