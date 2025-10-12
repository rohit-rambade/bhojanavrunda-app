import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Welcome to Bhojanavrunda
      </Text>

      <Button title="Login" onPress={() => router.push("/login")} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
