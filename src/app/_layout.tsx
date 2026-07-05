import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="home" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
