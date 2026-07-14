import AsyncStorage from "@react-native-async-storage/async-storage";
import { NutrientObject } from "./data";

export type Meal = {
  fdcId: string;
  description: string;
  brandName: string;
  nutrients: NutrientObject;
  amount: string;
  id: string;
  mealtime: string;
  createdAt: string;
};

export type userSettings = {
  age: number;
  isFemale: boolean;
  pregnant: boolean;
  lactating: boolean;
  height: number;
  weight: number;
  protein: number;
  carbs: number;
  fats: number;
  act?: number;
};

export const DEFAULT_LS: userSettings = {
  age: 20,
  isFemale: false,
  pregnant: false,
  lactating: false,
  height: 160,
  weight: 60,
  protein: 0.3,
  fats: 0.3,
  carbs: 0.4,
  act: 1.25,
};

async function updateNutrients(
  nutri: NutrientObject,
  date = new Date().getDate(),
  month = new Date().getMonth(),
) {
  const KEY = `nutri-${date}-${month}`;
  const asyncNutriObject = await AsyncStorage.getItem(KEY);
  const nutrients: NutrientObject = asyncNutriObject
    ? JSON.parse(asyncNutriObject)
    : { micros: [], macros: [] };

  nutri.macros.forEach((macro) => {
    const x = nutrients.macros.find(
      (item) => item.nutrientId === macro.nutrientId,
    );
    if (x) x.value += macro.value;
    else nutrients.macros.push(JSON.parse(JSON.stringify(macro)));
  });
  nutri.micros.forEach((micro) => {
    const x = nutrients.micros.find(
      (item) => item.nutrientId === micro.nutrientId,
    );
    if (x) x.value += micro.value;
    else nutrients.micros.push(JSON.parse(JSON.stringify(micro)));
  });
  await AsyncStorage.setItem(KEY, JSON.stringify(nutrients));
}

async function removeNutrients(
  nutri: NutrientObject | undefined,
  date = new Date().getDate(),
  month = new Date().getMonth(),
) {
  if (!nutri) return;
  const KEY = `nutri-${date}-${month}`;
  const asyncNutriObject = await AsyncStorage.getItem(KEY);
  const nutrients: NutrientObject = asyncNutriObject
    ? JSON.parse(asyncNutriObject)
    : { micros: [], macros: [] };
  nutri.macros.forEach((macro) => {
    const x = nutrients.macros.find(
      (item) => item.nutrientId === macro.nutrientId,
    );
    if (x) x.value -= macro.value;
    // else nutrients.macros.push(JSON.parse(JSON.stringify(macro)));
  });
  nutri.micros.forEach((micro) => {
    const x = nutrients.micros.find(
      (item) => item.nutrientId === micro.nutrientId,
    );
    if (x) x.value -= micro.value;
    // else nutrients.micros.push(JSON.parse(JSON.stringify(micro)));
  });
  await AsyncStorage.setItem(KEY, JSON.stringify(nutrients));
}

export async function getDailyNutrients(
  date = new Date().getDate(),
  month = new Date().getMonth(),
): Promise<NutrientObject | null> {
  const item = await AsyncStorage.getItem(`nutri-${date}-${month}`);
  return item ? (JSON.parse(item) as NutrientObject) : null;
}
export async function hasMeals(date: string): Promise<boolean> {
  return (await AsyncStorage.getItem(date)) !== null;
}

export async function getMeals(date: string): Promise<Record<string, Meal[]>> {
  const data = await AsyncStorage.getItem(date);
  return data
    ? JSON.parse(data)
    : {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      };
}

export async function addMeals(
  fdcId: string,
  description: string,
  brandName: string,
  nutrients: NutrientObject,
  amount: string,
  mealtime: "breakfast" | "lunch" | "dinner" | "snacks",
): Promise<Meal> {
  const newMeal: Meal = {
    fdcId,
    description,
    brandName,
    nutrients,
    amount,
    id: Date.now().toString(),
    createdAt: new Date().getDate().toString(),
    mealtime,
  };
  const meals = await getMeals(newMeal.createdAt);
  meals[mealtime].push(newMeal);
  await AsyncStorage.setItem(newMeal.createdAt, JSON.stringify(meals));
  // console.log(meals, mealtime, newMeal.createdAt);
  updateNutrients(newMeal.nutrients);
  return newMeal;
}

export async function deleteMeal(
  mealid: string,
  mealtime: string,
  date: string = new Date().getDate().toString(),
) {
  const meals = await getMeals(date);
  await removeNutrients(
    meals[mealtime].find((meal) => mealid === meal.id)?.nutrients,
  );
  meals[mealtime] = meals[mealtime].filter((meal) => meal.id !== mealid);
  await AsyncStorage.setItem(date, JSON.stringify(meals));
}

export async function getUserSettings(): Promise<userSettings> {
  const settings = await AsyncStorage.getItem("settings");
  if (!settings) await setUserSettings(DEFAULT_LS);
  return settings ? JSON.parse(settings) : DEFAULT_LS;
}
export async function setUserSettings(settings: userSettings) {
  console.log(settings);
  await AsyncStorage.setItem("settings", JSON.stringify(settings));
}
