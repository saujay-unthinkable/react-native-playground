import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import "react-native-reanimated";

import NetworkBoundary from "@/components/network-boundary";
import { customFonts } from "@/constants/theme";
import AuthProvider from "@/providers/auth-provider";
import StyledThemeProvider from "@/providers/styled-theme-provider";
import UserProvider from "@/providers/user-provider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent splash from auto-hiding.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFonts);

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <KeyboardAvoidingView style={{ flex: 1 }} />;
  }

  return (
    <AuthProvider>
      <UserProvider>
        <StyledThemeProvider>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <NetworkBoundary>
              <RootLayoutContent />
            </NetworkBoundary>
          </KeyboardAvoidingView>
        </StyledThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

function RootLayoutContent() {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
