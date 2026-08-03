import { useAuth } from "@/context/auth";
import { Button, Text, View } from "react-native";

export default function LoginForm() {
  const { signIn } = useAuth();
  return (
    <View className="base-view justify-center">
      <Text className="text-text-50 font-bold text-xl p-4">Login</Text>
      <Button title="sign in with google" onPress={signIn}></Button>
    </View>
  );
}
