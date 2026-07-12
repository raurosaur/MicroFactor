import { getLifeStage, RDA } from "@/utils/rda";
import { getDailyNutrients, getUserSettings } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function DailyScore({
  date = new Date().getDate(),
  month = new Date().getMonth(),
}) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function calculateScore() {
      const nutrients = await getDailyNutrients(date, month);
      const { age, isFemale, pregnant, lactating } = await getUserSettings();
      const lifestage = getLifeStage(isFemale, age, pregnant, lactating);
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
      setScore(sum / count);
    }

    calculateScore();
  }, []);
  return (
    <View className=" w-40 h-40 border-8 border-accent-500 justify-center items-center rounded-full">
      <Text
        className={`${score < 40 ? "text-secondary-500" : score < 80 ? "text-orange-500" : "text-green-500"} text-3xl font-bold`}
      >{`${score.toFixed(0)}%`}</Text>
    </View>
  );
}
