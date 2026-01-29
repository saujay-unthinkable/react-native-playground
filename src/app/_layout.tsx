import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { customFonts } from "@/constants/theme";
import { ApplicationProvider } from "@/providers/ApplicationProvider";
import StyledThemeProvider from "@/providers/StyledThemeProvider";
import { useApplication } from "@/services/context/application";
import { KeyboardAvoidingView, Platform } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(customFonts);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// This will wraps all the providers.
function RootLayoutNav() {
  return (
    <ApplicationProvider>
      <StyledThemeProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <AppContent />
        </KeyboardAvoidingView>
      </StyledThemeProvider>
    </ApplicationProvider>
  );
}

function AppContent() {
  const { hasUserLoggedIn } = useApplication();
  const router = useRouter();

  useEffect(() => {
    if (!hasUserLoggedIn) {
      router.replace("/onboarding");
    }
  }, [hasUserLoggedIn, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
