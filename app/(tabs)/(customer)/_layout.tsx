// This hosts the ONLY TabBar for Customer
import DashboardIcon from "@/assets/icons/dashboard-icon.png";
import Groups from "@/assets/icons/groups.png";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function CustomerTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: () => (
            <Image source={DashboardIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="JoinedGroups"
        options={{
          title: "Groups",
          tabBarIcon: () => (
            <Image source={Groups} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="TenantList"
        options={{
          title: "Tenants",
          tabBarIcon: () => (
            <Image source={Groups} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
    </Tabs>
  );
}
