// app/_layout.tsx
import store, { persistor, useAppSelector } from "@/src/store";
import { Slot, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function RootLayoutContent() {
  const router = useRouter();
  const pathname: string = usePathname();
  const { session } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (session === undefined) return;

    const onRoot = pathname === "/";
    const inAuth = pathname === "/login" || pathname === "/register";

    if (!session || !session.signedIn) {
      if (!inAuth) router.replace("/login");
      return;
    }

    if (onRoot || inAuth) {
      const role: string = "customer";
      const target: string =
        role === "tenant" ? "/(tabs)/(tenant)" : "/(tabs)/(customer)";
      if (pathname !== target) router.replace(target);
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
