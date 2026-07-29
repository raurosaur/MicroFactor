import MacroNutrientView from "@/components/MacroNutrientView";
import { NutrientObject } from "@/utils/data";
import { addMeals } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Adds the food item to the current day's meal object and returns to the meal page
 *
 * @param fdcId fdc id of food item as per USDA
 * @param description the name of the item
 * @param brandName brand name if it exists
 * @param nutrients nutrient array
 * @param amount value of the food item (usually in g/ml)
 * @param multiplier amount / 100
 * @param mealtime breakfast | lunch | dinner | snacks
 * @param date current date (1-31)
 */
async function AddToToday(
  fdcId: string,
  description: string,
  brandName: string,
  nutrients: NutrientObject,
  amount: number,
  multiplier: number,
  mealtime: "breakfast" | "lunch" | "dinner" | "snacks",
  date: string,
) {
  const newNutrients: NutrientObject = { macros: [], micros: [] };
  console.assert(!!nutrients);
  newNutrients.micros = nutrients.micros.map((nutrient) => {
    const newNutrient = { ...nutrient };
    newNutrient.value *= multiplier;
    return newNutrient;
  });
  newNutrients.macros = nutrients.macros.map((nutrient) => {
    const newNutrient = { ...nutrient };
    newNutrient.value *= multiplier;
    return newNutrient;
  });
  await addMeals(
    fdcId,
    description,
    brandName,
    newNutrients,
    amount.toString(),
    mealtime,
    date,
  );
  console.log("Added");
  router.dismiss(2);
}

export default function FoodItemPage() {
  const params = useLocalSearchParams();

  const { fdcId, description, brandName, mealtime, date, portion } = params;

  const serving = +params.serving;

  const nutrients = JSON.parse(params.nutrients as string) as NutrientObject;

  const [amount, setAmount] = useState(serving ?? 100);
  const [multiplier, setMultiplier] = useState(1);

  //STYLES
  const nutrientInfoStyle = "text-text-50 text-xl";
  const styleTextHeader = "text-white text-xl text-bold text-center flex-1 p-4";
  /**
   *
   * @param value
   */
  function changeAmount(value: string) {
    setAmount(+value);
    setMultiplier(+value / serving);
  }
  return (
    <View className="base-view py-10">
      <View className="hdr flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" color="white" size={28} />
        </TouchableOpacity>
        <Text className={styleTextHeader}>
          {[brandName, description].join(" ")}
        </Text>
        <TextInput
          className="bg-primary-200 text-l rounded-xl text-center p-3 w-24"
          placeholder={(portion as string) ?? "100g/ml"}
          // value={amount}
          onChangeText={changeAmount}
        />
      </View>
      <ScrollView>
        <MacroNutrientView
          protein={
            (nutrients.macros.find((x) => x.nutrientId === 1003)?.value ?? 0) *
            multiplier
          }
          fats={
            (nutrients.macros.find((x) => x.nutrientId === 1004)?.value ?? 0) *
            multiplier
          }
          carbs={
            (nutrients.macros.find((x) => x.nutrientId === 1005)?.value ?? 0) *
            multiplier
          }
          energy={
            (nutrients.macros.find((x) => x.nutrientId === 1008)?.value ?? 0) *
            multiplier
          }
        />
        <View className="flex-1">
          <Text className="text-text-50 text-2xl p-2 bg-primary-600">
            MICRONUTRIENTS
          </Text>
          {nutrients.micros.map((nutrient) => (
            <View
              className="bg-primary-400/40 p-1 flex-row justify-between mt-1"
              key={nutrient.nutrientId}
            >
              <Text className={nutrientInfoStyle}>{nutrient.name}</Text>
              <Text className={nutrientInfoStyle}>
                {((nutrient.value ?? 0) * multiplier).toFixed(2)}{" "}
                {nutrient.unitName.toLowerCase()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="bg-secondary-400 items-center mt-1"
        onPress={async () => {
          await AddToToday(
            fdcId as string,
            description as string,
            brandName as string,
            nutrients,
            amount,
            multiplier,
            mealtime as "breakfast" | "lunch" | "dinner" | "snacks",
            date as string,
          );
        }}
      >
        <Text className="text-text-100 text-2xl p-1 font-bold">ADD</Text>
      </TouchableOpacity>
    </View>
  );
}
