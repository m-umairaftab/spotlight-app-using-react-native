import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return; // Wait until the auth state is loaded

    const isAuthScreen = segments[0] === "(auth)";
    if (!isSignedIn && !isAuthScreen) {
      router.replace("/(auth)/login");
    } else if (isSignedIn && isAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null; // or a loading spinner
  return <Stack screenOptions={{ headerShown: false }} />;
}
