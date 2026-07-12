import DailyScore from "@/components/DailyScore";
import Header from "@/components/header";
import MacroNutrientView from "@/components/MacroNutrientView";
import MicroNutrientView from "@/components/MicroNutrientView";
import { NutrientObject } from "@/utils/data";
import { getDailyNutrients } from "@/utils/storage";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function App() {
  const [totalDayNutrients, setTotalDayNutrients] = useState<NutrientObject>();

  useEffect(() => {
    async function loadMeals() {
      const daily = await getDailyNutrients();
      setTotalDayNutrients(daily ?? { macros: [], micros: [] });
    }

    loadMeals();
  });
  return (
    <View className="base-view">
      <Header />
      <View className="flex-[2] justify-center items-center">
        <DailyScore></DailyScore>
      </View>
      <MacroNutrientView
        protein={
          totalDayNutrients?.macros.find((x) => x.nutrientId === 1003)?.value ??
          0
        }
        fats={
          totalDayNutrients?.macros.find((x) => x.nutrientId === 1004)?.value ??
          0
        }
        carbs={
          totalDayNutrients?.macros.find((x) => x.nutrientId === 1005)?.value ??
          0
        }
        energy={
          totalDayNutrients?.macros.find((x) => x.nutrientId === 1008)?.value ??
          0
        }
      />
      <MicroNutrientView micronutrients={totalDayNutrients?.micros ?? []} />
    </View>
  );
}
