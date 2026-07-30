import { Text, View } from "react-native";

export default function DailyScore({ score = 0 }: { score?: number }) {
  // console.log(score);
  return (
    <View className="h-40 w-40 border-8 border-accent-500 justify-center items-center rounded-full">
      <Text
        className={`${score < 40 || score > 110 ? "text-secondary-500" : score < 80 ? "text-orange-500" : "text-green-500"} text-3xl font-bold`}
      >{`${score.toFixed(0)}%`}</Text>
    </View>
  );
}
