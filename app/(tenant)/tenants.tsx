import { signOutSuccess, useAppDispatch, useAppSelector } from "@/src/store";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tenants = () => {
  const { session } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <Text>tenants</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(signOutSuccess());
          router.replace("/login");
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default tenants;

const styles = StyleSheet.create({});
