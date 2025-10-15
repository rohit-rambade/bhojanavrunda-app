import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      {/* <Tabs.Screen name="tenants" options={{ title: "Tenants" }} /> */}
      {/* <Tabs.Screen name="customers" options={{ title: "Customers" }} /> */}
    </Tabs>
  );
}
