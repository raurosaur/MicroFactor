import { NutrientLocal } from "@/utils/data";
import { getLifeStage, LifeStage, RDA } from "@/utils/rda";
import { getUserSettings, userSettings } from "@/utils/storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import NutrientElement from "./NutrientElement";

type PropType = {
  micronutrients: NutrientLocal[];
  lifestage: LifeStage;
};

export default function MicroNutrientView({
  micronutrients,
  lifestage,
}: PropType) {
  const nutrient_heading_style = "text-text-50 text-2xl p-2";
  const [userSettings, setUserSettings] = useState<userSettings>();
  const [max_value, setMaxValue] = useState<Record<number, [number, string]>>(
    RDA["male_19_30"],
  );
  useEffect(() => {
    async function index() {
      setUserSettings(await getUserSettings());

      if (userSettings) {
        const { isFemale, age, pregnant, lactating } = userSettings;
        setMaxValue(RDA[getLifeStage(isFemale, age, pregnant, lactating)]);
      }
    }

    index();
  }, []);
  return (
    <ScrollView className="macros nutrient-view flex-[4]">
      <Text className={nutrient_heading_style}>MICRONUTRIENTS</Text>

      {micronutrients
        .filter((nutrient) => nutrient.nutrientId in max_value)
        .map((nutrient) => (
          <Link
            href={{
              pathname: "/Information",
              params: {
                id: nutrient.nutrientId,
                micronutrients: JSON.stringify(micronutrients),
                lifestage,
              },
            }}
            push
            key={nutrient.nutrientId}
            asChild
          >
            <TouchableOpacity>
              <NutrientElement
                name={nutrient.name}
                value={nutrient.value}
                max_value={max_value[nutrient.nutrientId][0]}
                unit={nutrient.unitName.toLowerCase()}
              />
            </TouchableOpacity>
          </Link>
        ))}
    </ScrollView>
  );
}
