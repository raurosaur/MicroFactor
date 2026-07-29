import { FoodNutrient } from "@/types/types";

export const macroDisplayNames: Record<number, string> = {
  1008: "Calories",
  1003: "Protein",
  1004: "Fat",
  1005: "Carbs",
  2000: "Total Sugar",
  1258: "Saturated Fat",
  1257: "Trans Fat",
  1292: "Monounsaturated Fat",
  1293: "Polyunsaturated Fat",
  1253: "Cholesterol",
  1051: "Water",
  1009: "Starch",
  1010: "Sucrose",
  1011: "Glucose",
  1012: "Fructose",
  1013: "Lactose",
  1014: "Maltose",
};
export const microNameToId: Record<string, number> = {
  sodium: 1093,
  fiber: 1079,

  // Minerals
  calcium: 1087,
  iron: 1089,
  magnesium: 1090,
  phosphorus: 1091,
  potassium: 1092,
  zinc: 1095,
  copper: 1098,
  manganese: 1101,
  selenium: 1103,

  // Vitamins
  "vitamin-a": 1106,
  "vitamin-d": 1114,
  "vitamin-c": 1162,
  thiamin: 1165,
  riboflavin: 1166,
  niacin: 1167,
  "pantothenic-acid": 1170,
  "vitamin-b6": 1175,
  biotin: 1176,
  folate: 1177,
  "vitamin-b12": 1178,
  choline: 1180,
  "vitamin-k": 1185,
  "vitamin-e": 1109,
};
export const microDisplayNames: Record<number, string> = {
  1093: "Sodium",
  1079: "Fiber",
  // Minerals
  1087: "Calcium",
  1089: "Iron",
  1090: "Magnesium",
  1091: "Phosphorus",
  1092: "Potassium",
  1095: "Zinc",
  1098: "Copper",
  1101: "Manganese",
  1103: "Selenium",

  // Vitamins
  1106: "Vitamin A",
  1114: "Vitamin D",
  1162: "Vitamin C",
  1165: "Thiamin",
  1166: "Riboflavin",
  1167: "Niacin",
  1170: "Pantothenic Acid",
  1175: "Vitamin B6",
  1176: "Biotin",
  1177: "Folate",
  1178: "Vitamin B12",
  1180: "Choline",
  1185: "Vitamin K",
  1109: "Vitamin E",
};
export type NutrientLocal = {
  nutrientId: number;
  value: number;
  unitName: string;
  name: string;
};
export type NutrientObject = {
  macros: NutrientLocal[];
  micros: NutrientLocal[];
};

function NutrientLocal(
  nutrientId: number,
  value: number,
  unitName: string,
  name: string,
): NutrientLocal {
  return { nutrientId, value, unitName, name };
}

/**
 *
 * preprocesses the nutrient object and returns a cleaned version with display names and macros and micros split
 *
 * @param nutrients - array containining all the nutrients
 *
 * @returns Nutrient Object with macro array and micro array
 *
 */
export function cleanNutrients(nutrients: Array<FoodNutrient>) {
  const nutriObject: NutrientObject = { macros: [], micros: [] };

  nutrients.forEach((nutrient) => {
    if (
      nutrient.value <= 0 ||
      (!(nutrient.nutrientId in macroDisplayNames) &&
        !(nutrient.nutrientId in microDisplayNames))
    )
      return;
    const displayNames =
      nutrient.nutrientId in macroDisplayNames
        ? macroDisplayNames
        : microDisplayNames;
    const key =
      nutrient.nutrientId in macroDisplayNames
        ? nutriObject.macros
        : nutriObject.micros;
    key.push({
      nutrientId: nutrient.nutrientId,
      value: nutrient.value,
      name: displayNames[nutrient.nutrientId],
      unitName: nutrient.unitName,
    });
  });

  return nutriObject;
}
/**
 * preprocesses the nutriment object returned from the open food api
 * and returns a cleaned version with display names and macros and micros split
 *
 * @param nutriments nutriments returned by the api
 * @returns Nutrient Object with macro array and micro array
 */
export function processNutriments(nutriments: Record<string, number | string>) {
  const nutriObject: NutrientObject = { macros: [], micros: [] };

  nutriObject.macros.push(
    NutrientLocal(
      1003,
      (nutriments["proteins_serving"] as number) ?? 0,
      (nutriments["proteins_unit"] as string) ?? "g",
      macroDisplayNames[1003],
    ),
    NutrientLocal(
      1005,
      nutriments["carbohydrates_serving"] as number,
      nutriments["carbohydrates_unit"] as string,
      macroDisplayNames[1005],
    ),
    NutrientLocal(
      1004,
      nutriments["fat_serving"] as number,
      nutriments["fat_unit"] as string,
      macroDisplayNames[1004],
    ),
    NutrientLocal(
      1008,
      nutriments["energy-kcal_serving"] as number,
      nutriments["energy-kcal_unit"] as string,
      macroDisplayNames[1008],
    ),
  );

  Object.entries(nutriments).map((value) => {
    if (value[0].endsWith("serving")) {
      const name = value[0].split("_")[0];
      const val = value[1];

      if (name in microNameToId) {
        const id = microNameToId[name.split("_")[0]];
        const [convertedVal, unit] = normalizeUnit(val as number, id);
        nutriObject.micros.push(
          NutrientLocal(id, convertedVal, unit, microDisplayNames[id]),
        );
      }
    }
  });
  return nutriObject;
}
/**
 *
 * computes the BMR using the Mifflin-St Jeor Equation
 *
 * @param height - height in cm
 * @param weight - weight in kg
 * @param age - age of user
 * @param isFemale - boolean value for if user is female
 * @param act - activity level of user. one of 5 values
 *
 * @returns bmr value
 *
 */
export function calculateBMR(
  height: number,
  weight: number,
  age: number,
  isFemale: boolean,
  act = 1.2,
) {
  // Mifflin-St Jeor Equation:
  const x = 10 * weight + 6.25 * height - 5 * age;

  return act * (x + (isFemale ? -161 : 5));
}

/**
 * checks if current date is today
 *
 * @param date - date object of current page
 *
 * @returns True/False
 */
export function isToday(date: Date) {
  const today = new Date();
  return (
    today.getDate() === date.getDate() && today.getMonth() === date.getMonth()
  );
}

/**
 * checks if current date is within the past week
 *
 * @param date - current date
 *
 * @returns True/False
 */
export function withinWeekFromToday(date: Date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - target.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= 7;
}
/**
 * sets the current date to previous
 *
 * @param setDate - setState react function
 *
 *
 */
export function datePrev(setDate: React.Dispatch<React.SetStateAction<Date>>) {
  setDate((prev) => {
    const next = new Date(prev);
    next.setDate(next.getDate() - 1);
    return next;
  });
}
/**
 * sets the current date to next day
 *
 * @param setDate - setState react function
 *
 *
 */
export function dateNext(setDate: React.Dispatch<React.SetStateAction<Date>>) {
  setDate((prev) => {
    const next = new Date(prev);
    next.setDate(next.getDate() + 1);
    return next;
  });
}
/**
 * Normalizes the values returned in (g) to RDA appropriate units
 * @param value value of micronutrient
 * @param nutrientId micronutrient id
 * @returns [value of micronutrient, unit of micronutrient]
 */
export function normalizeUnit(
  value: number,
  nutrientId: number,
): [number, string] {
  if ([1106, 1114, 1185, 1177, 1178, 1176].includes(nutrientId))
    return [value * 1e6, "mcg"];
  if ([1162, 1109, 1165, 1166, 1167, 1175, 1170, 1180].includes(nutrientId))
    return [value * 1e3, "mg"];
  return [0, "g"];
}
