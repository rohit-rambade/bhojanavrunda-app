import { Stack } from "expo-router";

export default function DetailLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // presentation: "modal", // uncomment for iOS modal style
      }}
    />
  );
}
