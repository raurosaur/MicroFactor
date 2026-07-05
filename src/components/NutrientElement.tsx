import { Text, View } from "react-native";
import NutrientBar from "./NutrientBar";

type NutrientElementProps = {
  name: string;
  value: number;
  percent: number;
  unit?: string;
};

export default function NutrientElement({
  name,
  value,
  percent,
  unit = "kcal",
}: NutrientElementProps) {
  const nameStyle = "text-xl text-text-50";
  return (
    <View className="flex">
      <View className="flex flex-row justify-between">
        <Text className={nameStyle}>{name}</Text>
        <Text className={nameStyle}>{`${value} ${unit}`}</Text>
      </View>
      <NutrientBar percent={percent} />
    </View>
  );
}
