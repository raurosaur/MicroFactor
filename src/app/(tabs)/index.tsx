import DailyScore from "@/components/DailyScore";
import Header from "@/components/header";
import MacroNutrientView from "@/components/MacroNutrientView";
import MicroNutrientView from "@/components/MicroNutrientView";
import { microDisplayNames, NutrientLocal, NutrientObject } from "@/utils/data";
import { getLifeStage, RDA } from "@/utils/rda";
import { getDailyNutrients, getUserSettings } from "@/utils/storage";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function App() {
  const [totalDayNutrients, setTotalDayNutrients] = useState<NutrientObject>();
  const [date, setDate] = useState<Date>(new Date());
  const [score, setScore] = useState(0);
  const [lifestage, setLifeStage] = useState(getLifeStage(false, 20));

  useEffect(() => {
    async function loadMeals() {
      const daily = await getDailyNutrients(date.getDate(), date.getMonth());
      setTotalDayNutrients(
        daily ?? {
          macros: [],
          micros: Object.keys(RDA["child_1_3"]).map(
            (id: string) =>
              ({
                nutrientId: +id,
                value: 0,
                unitName: RDA["child_1_3"][+id][1],
                name: microDisplayNames[+id],
              }) as NutrientLocal,
          ),
        },
      );
    }
    async function calculateScore() {
      const nutrients = await getDailyNutrients(date.getDay(), date.getMonth());
      const { age, isFemale, pregnant, lactating } = await getUserSettings();
      setLifeStage(getLifeStage(isFemale, age, pregnant, lactating));
      let count = 0;
      let sum = 0;
      nutrients?.micros.forEach((nutrient) => {
        if (nutrient.nutrientId in RDA[lifestage]) {
          sum += Math.max(
            nutrient.value / RDA[lifestage][nutrient.nutrientId][0],
            1,
          );
          count++;
        }
      });
      if (!isNaN(sum / count)) setScore(sum / count);
    }
    loadMeals();
    calculateScore();
  }, [date]);
  return (
    <ScrollView className="base-view">
      <Header date={date} setDate={setDate} />
      <View className="flex-[2] justify-center items-center">
        <DailyScore score={score * 100} />
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
      <MicroNutrientView
        micronutrients={totalDayNutrients?.micros ?? []}
        lifestage={lifestage}
      />
    </ScrollView>
  );
}
