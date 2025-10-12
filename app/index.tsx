import { Colors } from "@/src/theme/theme";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo/bhojanavrunda-logo.png";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={logo} style={styles.image} />

      <Text style={{ fontSize: 50, marginBottom: 20 }}>Bhojanavrunda</Text>

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
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain", // or 'cover', 'stretch', 'center', 'repeat'
  },
});
