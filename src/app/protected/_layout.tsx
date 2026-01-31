import { useAuth } from "@/services/context/auth";
import { useUser } from "@/services/context/user";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const ProtectedLayout = () => {
  console.log("[_ProtectedLayout]: Initialized.");
  const { hasUserLoggedIn, isAuthLoading } = useAuth();
  const { userProfile, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading || isUserLoading) {
      return;
    }

    if (hasUserLoggedIn) {
      const isProfileCompleted = !!userProfile?.customer?.is_profile_completed;

      if (isProfileCompleted) {
        // Navigate to home tab if profile is complete.
        router.replace("/protected/home");
      } else {
        // Navigate to edit profile if incomplete.
        router.replace("/protected/edit-profile");
      }
    }
  }, [isAuthLoading, isUserLoading, hasUserLoggedIn, userProfile, router]);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default ProtectedLayout;
