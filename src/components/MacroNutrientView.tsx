import NutrientElement from "@/components/NutrientElement";
import { calculateBMR } from "@/utils/data";
import { getUserSettings, userSettings } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export type MacroNutrientProps = {
  protein: number;
  carbs: number;
  fats: number;
  energy: number;
};

export default function MacroNutrientView({
  protein = 0,
  carbs = 0,
  fats = 0,
  energy = 0,
}: Partial<MacroNutrientProps>) {
  const nutrient_heading_style = "text-text-50 text-2xl p-2";
  const [bmr, setBmr] = useState(2000);

  const [userSettings, setUserSettings] = useState<userSettings>();

  useEffect(() => {
    async function index() {
      setUserSettings(await getUserSettings());

      if (userSettings) {
        const { isFemale, age, pregnant, lactating, height, weight } =
          userSettings;
        setBmr(calculateBMR(height, weight, age, isFemale));
      }
    }

    index();
  }, []);

  const MAX_CARBS = (0.4 * bmr) / 4;
  const MAX_PROTEIN = (0.3 * bmr) / 4;
  const MAX_FATS = (0.3 * bmr) / 9;

  return (
    <View className="macros nutrient-view">
      <Text className={nutrient_heading_style}>MACRONUTRIENTS</Text>
      <NutrientElement
        name="Energy"
        max_value={bmr}
        value={energy}
        unit="kcal"
      />
      <NutrientElement name="Protein" max_value={MAX_PROTEIN} value={protein} />
      <NutrientElement
        name="Carbohydrates"
        max_value={MAX_CARBS}
        value={carbs}
      />
      <NutrientElement name="Fats" max_value={MAX_FATS} value={fats} />
    </View>
  );
}
