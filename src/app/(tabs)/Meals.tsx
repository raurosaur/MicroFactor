import Header from "@/components/header";
import MacroNutrientView from "@/components/Macros/MacroNutrientView";
import MealTime from "@/components/MealTime";
import { ScrollView, View } from "react-native";
type MealsType = {
  date?: string;
};

export default function Meals({ date = "TODAY" }: MealsType) {
  return (
    <View className="base-view">
      <Header />
      <ScrollView className="flex-1">
        <MacroNutrientView />
        <MealTime name="Breakfast" items={["hue", "hell"]}></MealTime>
        <MealTime name="Lunch" items={["hue", "hell"]}></MealTime>
      </ScrollView>
    </View>
  );
}
