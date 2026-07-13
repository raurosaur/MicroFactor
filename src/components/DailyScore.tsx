import { Text, View } from "react-native";

export default function DailyScore({ score = 0 }: { score?: number }) {
  return (
    <View className=" w-40 h-40 border-8 border-accent-500 justify-center items-center rounded-full">
      <Text
        className={`${score < 40 ? "text-secondary-500" : score < 80 ? "text-orange-500" : "text-green-500"} text-3xl font-bold`}
      >{`${score.toFixed(0)}%`}</Text>
    </View>
  );
}
