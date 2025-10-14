import { signOutSuccess, useAppSelector } from "@/src/store";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const index = () => {
  const { session } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(session);
  return (
    <SafeAreaView>
      <Text>index</Text>
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

export default index;

const styles = StyleSheet.create({});
