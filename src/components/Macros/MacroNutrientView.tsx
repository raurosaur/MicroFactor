import { Text, View } from "react-native";
import NutrientElement from "../NutrientElement";

export default function MacroNutrientView() {
  const nutrient_heading_style = "text-text-50 text-2xl p-2";

  return (
    <View className="macros nutrient-view">
      <Text className={nutrient_heading_style}>MACRONUTRIENTS</Text>
      <NutrientElement name="Energy" value={2000} percent={72} />
      <NutrientElement name="Protein" value={161} percent={92} />
      <NutrientElement name="Carbohydrates" value={200} percent={66} />
      <NutrientElement name="Fats" value={65.4} percent={65} />
    </View>
  );
}
