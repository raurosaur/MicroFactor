import { Text, View } from "react-native";

export default function DailyScore({ score = 0 }: { score?: number }) {
  return (
    <View className="aspect-square border-8 p-10 border-accent-500 justify-center items-center rounded-full">
      <Text
        className={`${score < 40 || score > 110 ? "text-secondary-500" : score < 80 ? "text-orange-500" : "text-green-500"} text-3xl font-bold`}
      >{`${score.toFixed(0)}%`}</Text>
    </View>
  );
}
