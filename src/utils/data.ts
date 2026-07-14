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

export function calculateBMR(
  height: number,
  weight: number,
  age: number,
  isFemale: boolean,
  act = 1.2,
) {
  // Mifflin-St Jeor Equation:
  const x = 10 * weight + 6.25 * height - 5 * age;
  console.log(act);
  return act * (x + (isFemale ? -161 : 5));
}

export function isToday(date: Date) {
  const today = new Date();
  return (
    today.getDate() === date.getDate() && today.getMonth() === date.getMonth()
  );
}

export function withinWeekFromToday(date: Date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - target.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= 7;
}
export function datePrev(setDate: React.Dispatch<React.SetStateAction<Date>>) {
  setDate((prev) => {
    const next = new Date(prev);
    next.setDate(next.getDate() - 1);
    return next;
  });
}
export function dateNext(setDate: React.Dispatch<React.SetStateAction<Date>>) {
  setDate((prev) => {
    const next = new Date(prev);
    next.setDate(next.getDate() + 1);
    return next;
  });
}
