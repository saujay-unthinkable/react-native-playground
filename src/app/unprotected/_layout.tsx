import { Stack } from "expo-router";

const UnprotectedLayout = () => {
  console.log("[_UnprotectedLayout]: Initialized.");
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default UnprotectedLayout;
