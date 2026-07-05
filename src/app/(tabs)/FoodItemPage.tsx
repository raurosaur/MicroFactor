import MacroNutrientView from "@/components/Macros/MacroNutrientView";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function FoodItemPage() {
  const styleTextHeader = "text-white text-2xl text-bold text-right flex-1 p-4";
  return (
    <View className="base-view py-10">
      <View className="hdr flex-row justify-between items-center p-4">
        <Ionicons name="arrow-back-circle-outline" color="white" size={28} />
        <Text className={styleTextHeader}>NAME OF ITEM</Text>
        <Text className={styleTextHeader}>400g</Text>
      </View>
      <MacroNutrientView />
      <View className="flex-1">
        <Text className="bg-primary-400/40 text-text-50 text-2xl p-2">
          MICRONUTRIENTS
        </Text>
      </View>
    </View>
  );
}
