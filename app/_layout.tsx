// app/_layout.tsx
import store, { persistor, useAppSelector } from "@/src/store";
import { Slot, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function RootLayoutContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { session } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (session === undefined) return;

    if (!session || !session.signedIn) {
      if (pathname !== "/login") router.replace("/login");
      return;
    }

    if (pathname === "/" || pathname === "/login") {
      const role: string = "customer";
      router.replace(
        role === "tenant" ? "/(tabs)/(tenant)" : "/(tabs)/(customer)"
      );
    }
  }, [session, pathname]);

  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
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
