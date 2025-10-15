import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function JoinedGroups() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💼 Joined Groups</Text>
      <Text>Welcome to the groups .</Text>

      <TouchableOpacity onPress={() => router.push(`/group/${5}`)}>
        <Text>join group</Text>
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
