import type { DimensionValue } from "react-native";
import { View } from "react-native";

type BarProp = {
  percent: number;
};
export default function NutrientBar({ percent }: BarProp) {
  const widthVal = `${percent}%` as DimensionValue;
  //   console.log(widthVal);
  return (
    <View className="relative w-full h-3 rounded-xl overflow-hidden bg-slate-400 my-1">
      <View
        className="absolute left-0 top-0 h-full bg-blue-600"
        style={{ width: widthVal }}
      />
    </View>
  );
}
