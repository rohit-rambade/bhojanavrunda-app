import { Colors } from "@/src/theme/theme";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 50, marginBottom: 20 }}>BhojanaVrunda</Text>

      <Text style={styles.tagline}>Need/No-Need? one tap!</Text>
      <Pressable
        onPress={() => router.push("/login")}
        style={({ pressed }) => [
          styles.primaryBtn,
          { backgroundColor: pressed ? Colors.primaryPressed : Colors.primary },
        ]}
      >
        <Text style={styles.primaryBtnText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  tagline: {
    textAlign: "center",
    color: Colors.subtext,
    fontSize: 17,
    lineHeight: 22,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  primaryBtn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    minWidth: 240,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
