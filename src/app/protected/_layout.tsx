import { Stack } from "expo-router";

const ProtectedLayout = () => {
  console.log("[_ProtectedLayout]: Initialized.");

  // return <Redirect href="/protected/edit-profile" />;

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default ProtectedLayout;
