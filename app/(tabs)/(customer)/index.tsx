import { signOutSuccess, useAppDispatch, useAppSelector } from "@/src/store";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomerDashboard() {
  const { session } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💼 Customer Dashboard</Text>
      <Text>Welcome to the customer dashboard! Manage your app here.</Text>
      <TouchableOpacity onPress={() => dispatch(signOutSuccess())}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
