import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TenantList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💼 Tenant List</Text>
      <Text>List of all tenants .</Text>
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
