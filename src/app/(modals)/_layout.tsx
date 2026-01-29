import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal",
        contentStyle: { backgroundColor: "rgba(0,0,0,0.4)" },
      }}
    />
  );
}
