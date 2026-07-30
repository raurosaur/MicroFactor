import { SearchResultFood } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NutrientObject } from "./data";
import { INFO } from "./info";
import LRUCache from "./LRU";
import SortedArray from "./sortedarray";

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

/**
 * updates the nutrition object for the given date (day)
 *
 * @param nutri - adds the nutrients to the day's total nutrient count
 * @param date - current page's date (1-31)
 *
 */
async function updateNutrients(nutri: NutrientObject, date: number) {
  const KEY = `nutri-${date}`;
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

/**
 * removes the nutrition object for the given date (day)
 *
 * @param nutri - adds the nutrients to the day's total nutrient count
 * @param date - current page's date (1-31)
 *
 */
async function removeNutrients(
  nutri: NutrientObject | undefined,
  date = new Date().getDate(),
) {
  if (!nutri) return;
  const KEY = `nutri-${date}`;
  const asyncNutriObject = await AsyncStorage.getItem(KEY);
  const nutrients: NutrientObject = asyncNutriObject
    ? JSON.parse(asyncNutriObject)
    : { micros: [], macros: [] };
  nutri.macros.forEach((macro) => {
    const x = nutrients.macros.find(
      (item) => item.nutrientId === macro.nutrientId,
    );
    if (x) x.value -= macro.value;
  });
  nutri.micros.forEach((micro) => {
    const x = nutrients.micros.find(
      (item) => item.nutrientId === micro.nutrientId,
    );
    if (x) x.value -= micro.value;
  });
  await AsyncStorage.setItem(KEY, JSON.stringify(nutrients));
}

/**
 * retrieves the nutrient object for the current date
 *
 * @param date - current page's date (1-31)
 *
 * @returns Nutrient Object or null
 */
export async function getDailyNutrients(
  date = new Date().getDate(),
): Promise<NutrientObject | null> {
  const item = await AsyncStorage.getItem(`nutri-${date}`);
  return item ? (JSON.parse(item) as NutrientObject) : null;
}

/**
 * checks whether date has logged meals
 *
 * @param date - current page's date (1-31)
 *
 * @returns True or False
 */
export async function hasMeals(date: string): Promise<boolean> {
  return (await AsyncStorage.getItem(date)) !== null;
}

/**
 * retrives the logged meals for the current date
 *
 * @param date - current page's date (1-31)
 *
 * @returns Meals record, creates empty one if one isnt logged
 */
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

/**
 * adds meal to current date's meal object and also adds the macros, micros in the nutrient object
 *
 * @param fdcId - fdc ID of the meal item
 * @param description - description of the food, usually its name
 * @param brandName - name of product if branded
 * @param amount - weight in g
 * @param mealtime - category of meal - "breakfast" | "lunch" | "dinner" | "snacks"
 * @param createdAt - date (1-31)  
 *
 * @returns the meal object
 */
export async function addMeals(
  fdcId: string,
  description: string,
  brandName: string,
  nutrients: NutrientObject,
  amount: string,
  mealtime: "breakfast" | "lunch" | "dinner" | "snacks",
  createdAt = new Date().getDate().toString(),
): Promise<Meal> {
  const newMeal: Meal = {
    fdcId,
    description,
    brandName,
    nutrients,
    amount,
    id: Date.now().toString(),
    createdAt,
    mealtime,
  };
  const meals = await getMeals(newMeal.createdAt);
  meals[mealtime].push(newMeal);
  await AsyncStorage.setItem(newMeal.createdAt, JSON.stringify(meals));
  console.log(createdAt);
  nutrients.micros.map((nutrient) => {
    if (nutrient.nutrientId in INFO) {
      setTopSources(
        nutrient.nutrientId,
        [brandName, description].join(" ").trim(),
        +amount,
      );
    }
  });

  updateNutrients(newMeal.nutrients, +createdAt); // done to prevent massive code changes
  return newMeal;
}

/**
 * deletes the given meal from the logs
 *
 * @param mealid: meal id of the meal, not the same as fdcId
 * @param mealtime - category of meal - "breakfast" | "lunch" | "dinner" | "snacks"
 * @param date - current date (1-31)
 *
 */
export async function deleteMeal(
  mealid: string,
  mealtime: string,
  date = new Date().getDate(),
) {
  const meals = await getMeals(date.toString());
  await removeNutrients(
    meals[mealtime].find((meal) => mealid === meal.id)?.nutrients,
    date,
  );
  meals[mealtime] = meals[mealtime].filter((meal) => meal.id !== mealid);
  await AsyncStorage.setItem(date.toString(), JSON.stringify(meals));
}

/**
 * retrieves the top five sources for the given micronutrient
 *
 * @param nutrientId: USDA id for the micronutrient
 *
 * @returns sorted array of the micronutrients
 *
 */
export async function getTopSources(nutrientId: number) {
  const asyncArr = await AsyncStorage.getItem(`TOP5-${nutrientId}`);
  if (!asyncArr) return new SortedArray();
  return new SortedArray(JSON.parse(asyncArr));
}

/**
 * adds a meal to the top sources sorted array
 *
 * @param nutrientId: USDA id for the micronutrient
 * @param name: name of food item (usually description)
 * @param amount: quantity of food consumed
 *
 */
export async function setTopSources(
  nutrientId: number,
  name: string,
  amount: number,
) {
  const array = await getTopSources(nutrientId);
  array.add([amount, name]);
  await AsyncStorage.setItem(
    `TOP5-${nutrientId}`,
    JSON.stringify(array.toArray()),
  );
}

/**
 * retrieves the user settings for height, weight, activity level, etc.
 * this information is used to compute the RDA
 *
 *
 * @returns user settings object or a default one
 *
 */
export async function getUserSettings(): Promise<userSettings> {
  const settings = await AsyncStorage.getItem("settings");
  if (!settings) await setUserSettings(DEFAULT_LS);
  return settings ? JSON.parse(settings) : DEFAULT_LS;
}

/**
 * sets the user settings for height, weight, activity level, etc.
 * this information is used to compute the RDA
 *
 */
export async function setUserSettings(settings: userSettings) {
  console.log(settings);
  await AsyncStorage.setItem("settings", JSON.stringify(settings));
}

/**
 * Retrieves the lru cache from async storage
 * @returns LRU Cache
 */
export async function getCache() {
  const dump = await AsyncStorage.getItem("cache");
  const lru = new LRUCache<SearchResultFood[]>({ max: 50, ttl: 1e7 }, dump);
  return lru;
}

/**
 * Saves the cache to async storage
 */
export async function saveCache(cache: LRUCache<SearchResultFood[]>) {
  await AsyncStorage.setItem("cache", cache.dump());
}
