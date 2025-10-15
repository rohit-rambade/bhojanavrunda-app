import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TenantDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💼 Tenant Dashboard</Text>
      <Text>Welcome to the tenant dashboard! Manage your app here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
