import DashboardIcon from "@/assets/icons/dashboard-icon.png";
import GroupsIcon from "@/assets/icons/groups.png";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function CustomerTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: () => (
            <Image
              source={DashboardIcon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
          // headerShown: true,
        }}
      />

      <Tabs.Screen
        name="joined-groups"
        options={{
          headerShown: false,
          title: "Groups",
          tabBarIcon: () => (
            <Image
              source={GroupsIcon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tenants"
        options={{
          title: "Tenants",
          tabBarIcon: () => (
            <Image
              source={GroupsIcon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
