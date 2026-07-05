import DailyScore from "@/components/DailyScore";
import Header from "@/components/header";
import MacroNutrientView from "@/components/Macros/MacroNutrientView";
import MicroNutrientView from "@/components/Micros/MicroNutrientView";
import { View } from "react-native";

export default function App() {
  return (
    <View className="base-view">
      <Header />
      <View className="flex-[2] justify-center items-center">
        <DailyScore></DailyScore>
      </View>
      <MacroNutrientView />
      <MicroNutrientView />
    </View>
  );
}
