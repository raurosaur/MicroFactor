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
  const [MAX, setMAX] = useState({ carbs: 0.4, protein: 0.3, fats: 0.3 });
  useEffect(() => {
    async function index() {
      setUserSettings(await getUserSettings());

      if (userSettings) {
        const {
          isFemale,
          age,
          pregnant,
          lactating,
          height,
          weight,
          protein,
          carbs,
          fats,
          act,
        } = userSettings;
        setBmr(calculateBMR(height, weight, age, isFemale, act));
        setMAX({ carbs, protein, fats });
      }
    }

    index();
  }, []);

  return (
    <View className="macros nutrient-view">
      <Text className={nutrient_heading_style}>MACRONUTRIENTS</Text>
      <NutrientElement
        name="Energy"
        max_value={Math.ceil(bmr)}
        value={energy}
        unit="kcal"
      />
      <NutrientElement
        name="Protein"
        max_value={Math.ceil((MAX.protein * bmr) / 4)}
        value={protein}
      />
      <NutrientElement
        name="Carbohydrates"
        max_value={Math.ceil((MAX.carbs * bmr) / 4)}
        value={carbs}
      />
      <NutrientElement
        name="Fats"
        max_value={Math.ceil((MAX.fats * bmr) / 9)}
        value={fats}
      />
    </View>
  );
}
