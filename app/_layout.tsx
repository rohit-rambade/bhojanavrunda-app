import store, { persistor, useAppSelector } from "@/src/store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function RootLayoutContent() {
  const router = useRouter();
  const { session } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!session) return;

    if (session.signedIn) {
      const role: string = "tenant";

      if (role === "tenant") router.replace("/tenants");
      else router.replace("/login");
    } else {
      router.replace("/login");
    }
  }, [session]);

  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(tenant)" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <RootLayoutContent />
      </PersistGate>
    </Provider>
  );
}
