import { Text, View } from "react-native";
import NutrientBar from "./NutrientBar";

/**
 * @type defintion
 */
type NutrientElementProps = {
  name: string;
  value: number;
  max_value: number;
  unit?: string;
};

/**
 *
 */
function getPercent(val: number, max_val: number): number {
  return (val / max_val) * 100;
}
export default function NutrientElement({
  name,
  value,
  max_value,
  unit = "g",
}: NutrientElementProps) {
  const nameStyle = "text-xl text-text-50";
  return (
    <View className="flex">
      <View className="flex flex-row justify-between">
        <Text className={nameStyle}>{name}</Text>
        <Text
          className={nameStyle}
        >{`${value.toFixed(1)}/ ${max_value.toFixed(1)} ${unit}`}</Text>
      </View>
      <NutrientBar percent={getPercent(value, max_value)} />
    </View>
  );
}
