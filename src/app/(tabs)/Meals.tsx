import Header from "@/components/header";
import MacroNutrientView from "@/components/MacroNutrientView";
import MealTime from "@/components/MealTime";
import { NutrientObject } from "@/utils/data";
import { getDailyNutrients, getMeals, hasMeals, Meal } from "@/utils/storage";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
type MealsType = {
  date?: string;
};

export default function Meals({
  date = new Date().getDate().toString(),
}: MealsType) {
  const [meals, setMeals] = useState<Record<string, Meal[]>>();
  const [totalDayNutrients, setTotalDayNutrients] = useState<NutrientObject>();

  useEffect(() => {
    async function loadMeals() {
      const exists = await hasMeals(date);

      if (!exists) {
        setMeals({
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        });
        setTotalDayNutrients({ macros: [], micros: [] });
        return;
      }

      const loadedMeals = await getMeals(date);
      setMeals(loadedMeals);

      const daily = await getDailyNutrients();
      setTotalDayNutrients(daily ?? { macros: [], micros: [] });
    }

    loadMeals();
  });
  return (
    <View className="base-view">
      <Header date={date} />
      <ScrollView className="flex-1">
        <MacroNutrientView
          protein={
            totalDayNutrients?.macros.find((x) => x.nutrientId === 1003)
              ?.value ?? 0
          }
          fats={
            totalDayNutrients?.macros.find((x) => x.nutrientId === 1004)
              ?.value ?? 0
          }
          carbs={
            totalDayNutrients?.macros.find((x) => x.nutrientId === 1005)
              ?.value ?? 0
          }
          energy={
            totalDayNutrients?.macros.find((x) => x.nutrientId === 1008)
              ?.value ?? 0
          }
        />
        <MealTime name="Breakfast" meal={meals?.breakfast} />
        <MealTime name="Lunch" meal={meals?.lunch} />
        <MealTime name="Dinner" meal={meals?.dinner} />
        <MealTime name="Snacks" meal={meals?.snacks} />
      </ScrollView>
    </View>
  );
}
