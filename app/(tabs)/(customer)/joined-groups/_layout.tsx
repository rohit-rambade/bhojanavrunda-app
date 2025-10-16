import { Stack } from "expo-router";

export default function GroupsStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "Groups",
      }}
    />
  );
}
