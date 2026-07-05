import { Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/build/Ionicons";

type HeaderProps = {
  date?: string;
};

export default function Header({ date = "TODAY" }: HeaderProps) {
  return (
    <View className="hdr flex-row justify-between items-center p-4">
      <Ionicons name="caret-back-circle-outline" color="white" size={28} />
      <Text className="text-white text-2xl text-bold text-center p-4">
        {date}
      </Text>
      <Ionicons name="caret-forward-circle-outline" color="gray" size={28} />
    </View>
  );
}
