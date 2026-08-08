import { AuthProvider } from "@/context/auth";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
