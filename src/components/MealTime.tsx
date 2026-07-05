import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type MealTimeType = {
  name: string;
  items?: Array<string>;
};

export default function MealTime({ name, items = [] }: MealTimeType) {
  //   const items = ;
  return (
    <View className="my-2">
      <View className="flex-row justify-between items-center bg-primary-400/20">
        <Text className="text-white p-4 text-2xl">{name}</Text>
        <Ionicons
          name="add-circle-outline"
          className="p-4"
          size={28}
          color="white"
        />
      </View>
      {items.map((x) => (
        <Text key={x} className="meal-list-item">
          {x}
        </Text>
      ))}
    </View>
  );
}
