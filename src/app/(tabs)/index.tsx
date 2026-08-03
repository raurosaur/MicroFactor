import DailyScore from "@/components/DailyScore";
import Header from "@/components/header";
import LoginForm from "@/components/LoginForm";
import MacroNutrientView from "@/components/MacroNutrientView";
import MicroNutrientView from "@/components/MicroNutrientView";
import { useAuth } from "@/context/auth";
import {
  calculateBMR,
  microDisplayNames,
  NutrientLocal,
  NutrientObject,
} from "@/utils/data";
import { getLifeStage, RDA } from "@/utils/rda";
import { getDailyNutrients, getUserSettings } from "@/utils/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
export default function App() {
  const [totalDayNutrients, setTotalDayNutrients] = useState<NutrientObject>();
  const [date, setDate] = useState<Date>(new Date());
  const [score, setScore] = useState(0);
  const [lifestage, setLifeStage] = useState(getLifeStage(false, 20));
  const { user, isLoading } = useAuth();

  // console.log(user);

  useFocusEffect(
    useCallback(() => {
      console.log(user);
      async function loadMeals() {
        const daily = await getDailyNutrients(date.getDate());
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
        // console.log(totalDayNutrients);
      }
      async function calculateScore() {
        const nutrients = await getDailyNutrients(date.getDate());
        const {
          age,
          isFemale,
          pregnant,
          lactating,
          height,
          weight,
          protein,
          carbs,
          fats,
          act,
        } = await getUserSettings();
        setLifeStage(getLifeStage(isFemale, age, pregnant, lactating));
        let count = 0;
        let sum = 0;
        nutrients?.micros.forEach((nutrient) => {
          if (nutrient.nutrientId in RDA[lifestage]) {
            sum += Math.min(
              nutrient.value / RDA[lifestage][nutrient.nutrientId][0],
              1,
            );
            count++;
          }
        });
        const micro_score = !isNaN(sum / count) ? sum / count : 0;
        let macro_score = 0;
        const energy = calculateBMR(height, weight, age, isFemale, act);
        // console.log(energy);
        macro_score +=
          (nutrients?.macros.find((x) => x.nutrientId === 1003)?.value ?? 0) /
          Math.ceil((protein * energy) / 4);
        macro_score +=
          (nutrients?.macros.find((x) => x.nutrientId === 1005)?.value ?? 0) /
          Math.ceil((carbs * energy) / 4);
        macro_score +=
          (nutrients?.macros.find((x) => x.nutrientId === 1004)?.value ?? 0) /
          Math.ceil((fats * energy) / 9);
        macro_score +=
          (nutrients?.macros.find((x) => x.nutrientId === 1008)?.value ?? 0) /
          energy;
        setScore((0.6 * micro_score + 0.4 * macro_score) / 2);
      }
      loadMeals();
      calculateScore();
    }, [date, user]),
  );

  if (isLoading) {
    return (
      <View className="base-view">
        <ActivityIndicator />
      </View>
    );
  }
  if (!user) {
    return <LoginForm />;
  }
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
        date={date}
      />
    </ScrollView>
  );
}
