import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";

import InitialLayout from "@/components/InitialLayout";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // update the native navigation bar on Android.
  useEffect(() => {
    if (Platform.OS === "android") {
      const moduleName = "expo-navigation-bar";
      const navigationBar = require(
        moduleName,
      ) as typeof import("expo-navigation-bar");
      if (Platform.Version < 35) {
        navigationBar.setBackgroundColorAsync("#000000");
      }
      navigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#000" }}
          onLayout={onLayoutRootView}
        >
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar style="light" />
    </ClerkAndConvexProvider>
  );
}
