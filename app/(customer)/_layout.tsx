import { Tabs } from "expo-router";
import { Image } from "react-native";
import DashboardIcon from "../../assets/icons/dashboard-icon.png";
import Groups from "../../assets/icons/groups.png";

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
          tabBarIcon: ({ focused }) => (
            <Image
              source={DashboardIcon}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="JoinedGroups"
        options={{
          title: "Groups",
          tabBarIcon: ({ focused }) => (
            <Image
              source={Groups}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TenantList"
        options={{
          title: "Tenant List",
          tabBarIcon: ({ focused }) => (
            <Image
              source={Groups}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
