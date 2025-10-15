import { Tabs } from "expo-router";

export default function TenantTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
    </Tabs>
  );
}
