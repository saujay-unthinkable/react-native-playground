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
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const authenticateUser = async (
    accessToken?: string,
    refreshToken?: string,
  ) => {
    try {
      if (accessToken) await setAccessToken(accessToken);
      if (refreshToken) await setRefreshToken(refreshToken);
      setHasUserLoggedIn(true);
      console.log("[authenticateUser] - Credentials stored.");
    } catch (error) {
      console.error("Error storing credentials:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await removeUserData();
      setHasUserLoggedIn(false);
      console.log("[logoutUser] - Credentials removed.");
    } catch (error) {
      console.error("Error removing credentials:", error);
      setHasUserLoggedIn(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      console.log("Bootstrapping <AuthProvider/>");
      try {
        const token = await getAccessToken();
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
    isAuthLoading,
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
