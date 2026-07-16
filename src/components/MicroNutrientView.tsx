import { microDisplayNames, NutrientLocal } from "@/utils/data";
import { getLifeStage, LifeStage, RDA } from "@/utils/rda";
import { getUserSettings, userSettings } from "@/utils/storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import NutrientElement from "./NutrientElement";

type PropType = {
  micronutrients: NutrientLocal[];
  lifestage: LifeStage;
  date?: Date;
};

export default function MicroNutrientView({
  micronutrients,
  lifestage,
  date = new Date(),
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
    <View className="macros nutrient-view ">
      <Text className={nutrient_heading_style}>MICRONUTRIENTS</Text>

      {Object.keys(max_value).map((nutrientId) => {
        const nutrient =
          micronutrients.find((x) => x.nutrientId === +nutrientId) ??
          ({
            nutrientId: +nutrientId,
            name: microDisplayNames[+nutrientId],
            value: 0,
            unitName: max_value[+nutrientId][1],
          } as NutrientLocal);
        return (
          <Link
            href={{
              pathname: "/Information",
              params: {
                id: nutrient.nutrientId,
                micronutrients: JSON.stringify(micronutrients),
                lifestage,
                date: date.getDate().toString(),
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
        );
      })}
    </View>
  );
}
