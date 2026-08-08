import Header from "@/components/header";
import MacroNutrientView from "@/components/MacroNutrientView";
import MealTime from "@/components/MealTime";
import { NutrientObject } from "@/utils/data";
import { getDailyNutrients, getMeals, hasMeals, Meal } from "@/utils/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Meals() {
  const [meals, setMeals] = useState<Record<string, Meal[]>>();
  const [totalDayNutrients, setTotalDayNutrients] = useState<NutrientObject>();
  const [date, setDate] = useState<Date>(new Date());

  useFocusEffect(
    useCallback(() => {
      async function loadMeals() {
        const exists = await hasMeals(date.getDate().toString());

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

        const loadedMeals = await getMeals(date.getDate().toString());
        setMeals(loadedMeals);

        const daily = await getDailyNutrients(date.getDate());
        setTotalDayNutrients(daily ?? { macros: [], micros: [] });
      }

      loadMeals();
    }, [date]),
  );
  return (
    <SafeAreaView className="base-view">
      <Header date={date} setDate={setDate} />
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
        <MealTime name="Breakfast" meal={meals?.breakfast} date={date} />
        <MealTime name="Lunch" meal={meals?.lunch} date={date} />
        <MealTime name="Dinner" meal={meals?.dinner} date={date} />
        <MealTime name="Snacks" meal={meals?.snacks} date={date} />
      </ScrollView>
    </SafeAreaView>
  );
}
