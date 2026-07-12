import { Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/build/Ionicons";

type HeaderProps = {
  date?: string;
};

function isToday(date: string) {
  return date === new Date().getDate().toString();
}
export default function Header({
  date = new Date().getDate().toString(),
}: HeaderProps) {
  return (
    <View className="hdr flex-row justify-between items-center p-4">
      <Ionicons name="caret-back-circle-outline" color="white" size={28} />
      <Text className="text-white text-2xl text-bold text-center p-4">
        {isToday(date) ? "TODAY" : date}
      </Text>
      <Ionicons
        name="caret-forward-circle-outline"
        color={isToday(date) ? "gray" : "white"}
        size={28}
      />
    </View>
  );
}
