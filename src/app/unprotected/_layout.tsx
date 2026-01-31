import { useAuth } from "@/services/context/auth";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const UnprotectedLayout = () => {
  console.log("[_UnprotectedLayout]: Initialized.");
  const { hasUserLoggedIn, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(
      "[_UnprotectedLayout] isAuthLoading:",
      isAuthLoading,
      "hasUserLoggedIn:",
      hasUserLoggedIn,
    );
    if (isAuthLoading) return;

    if (hasUserLoggedIn) {
      router.replace("/protected");
    }
  }, [hasUserLoggedIn, router]);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default UnprotectedLayout;
