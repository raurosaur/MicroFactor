import BackArrow from "@/components/BackArrow";
import DailyScore from "@/components/DailyScore";
import { microDisplayNames, NutrientLocal } from "@/utils/data";
import { INFO } from "@/utils/info";
import { getLifeStage, LifeStage, RDA } from "@/utils/rda";
import SortedArray from "@/utils/sortedarray";
import { getMeals, getTopSources, hasMeals } from "@/utils/storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

type MicroInfoType = {
  name: string;
  RDA: number;
  unit: string;
  value: number;
};

export default function InformationPage() {
  const params = useLocalSearchParams();
  const id = +params.id;
  const information = INFO[id];
  const headingStyle = "text-secondary-500 text-2xl p-2 font-bold";
  const micronutrients = JSON.parse(
    params.micronutrients as string,
  ) as NutrientLocal[];
  const current =
    micronutrients?.find((nutrient) => nutrient.nutrientId === +id)?.value ?? 0;
  const max_val =
    RDA[(params.lifestage as LifeStage) ?? getLifeStage(false, 20)][id];
  const score = current / max_val[0];
  const [sources, setSources] = useState<SortedArray>(new SortedArray());
  const [sourcesToday, setSourcesToday] = useState<SortedArray>(
    new SortedArray(),
  );

  useEffect(() => {
    async function loadMeals() {
      const exists = await hasMeals(new Date().getDate().toString());
      if (exists) {
        const loadedMeals = await getMeals(new Date().getDate().toString());
        // setMeals(loadedMeals);
        const arr: [number, string][] = [];
        Object.values(loadedMeals).forEach((meal) =>
          meal.forEach((food) => {
            console.log(food);
            const x = food.nutrients.micros.find(
              (nutrient) => nutrient.nutrientId === id,
            );
            if (x)
              arr.push([
                x.value,
                [food.brandName, food.description].join(" ").trim(),
              ]);
          }),
        );
        setSourcesToday(new SortedArray(arr));
      }
    }

    async function loadSources() {
      const sources = await getTopSources(id);
      if (sources) setSources(sources);
    }

    loadMeals();
    loadSources();
    console.log(sourcesToday);
  }, []);

  return (
    <ScrollView className="base-view">
      <View className="hdr flex-row justify-between items-center p-4">
        <BackArrow onPress={() => router.back()} color="white" />
        <Text className="text-white text-2xl text-bold text-center p-4 flex-1">
          {microDisplayNames[id] ?? ""}
        </Text>
      </View>
      <View className="micro-div flex-row p-2 justify-around items-center">
        <DailyScore score={score * 100} />
        <Text className="text-text-50 text-2xl">
          {current}/{max_val.join("")}
        </Text>
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>INFORMATION</Text>
        <Text className="text-text-50 text-l p-2 m-2 text-justify">
          {information?.information}
        </Text>
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>Top Sources</Text>
        {information?.sources.map((source, index) => (
          <Text className="text-text-50 text-l px-4 my-1" key={index}>
            {source}
          </Text>
        ))}
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>Past Top Sources</Text>
        {sources.length > 0 ? (
          sources.toArray().map((x, i) => (
            <Text key={i} className="text-text-50 text-l p-2">
              {x[1]}
            </Text>
          ))
        ) : (
          <Text className="text-text-50 text-l p-2">Nothing to show here</Text>
        )}
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>Today's Top Sources</Text>
        {sourcesToday.length > 0 ? (
          sourcesToday.toArray().map((x, i) => (
            <Text key={i} className="text-text-50 text-l p-2">
              {x[1]}
            </Text>
          ))
        ) : (
          <Text className="text-text-50 text-l p-2">Nothing to show here</Text>
        )}
        <Text className="text-text-50 text-l p-2"></Text>
      </View>
    </ScrollView>
  );
}
