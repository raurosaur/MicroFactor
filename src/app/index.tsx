import DailyScore from "@/components/DailyScore";
import MacroNutrientView from "@/components/Macros/MacroNutrientView";
import MicroNutrientView from "@/components/Micros/MicroNutrientView";
import { Text, View } from "react-native";
import "../../global.css";

export default function App() {
  return (
    <View className="flex-1 flex-col justify-between text-text-50 bg-background-900">
      <View className="flex-1 hdr flex justify-center p-4">
        <Text className="text-white text-2xl text-bold text-center p-4">
          TODAY
        </Text>
      </View>
      <View className="flex-[2] justify-center items-center">
        <DailyScore></DailyScore>
      </View>
      <MacroNutrientView />
      <MicroNutrientView />
    </View>
  );
}
