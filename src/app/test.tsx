import DailyScore from "@/components/DailyScore";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type MicroInfoType = {
  name: string;
  RDA: number;
  unit: string;
  value: number;
};

export default function Test() {
  const headingStyle = "text-text-50 text-2xl p-2 font-bold";
  return (
    <View className="base-view">
      <View className="hdr flex-row justify-between items-center p-4">
        <Ionicons name="arrow-back-circle-outline" color="white" size={28} />
        <Text className="text-white text-2xl text-bold text-center p-4 flex-1">
          PLACEHOLDER
        </Text>
      </View>
      <View className="micro-div flex-row p-2 justify-around items-center">
        <DailyScore />
        <Text className="text-text-50 text-2xl">18/30g</Text>
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>INFORMATION</Text>
        <Text className="text-text-50 text-l p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          assumenda excepturi sed, provident cum sapiente, aperiam at
          accusantium id alias eligendi! Ipsam in dolor quibusdam. Temporibus
          maiores autem quibusdam illum, facere illo quas iure delectus veniam
          laborum corrupti! Voluptatum odio sed totam obcaecati,
        </Text>
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>Past Top Sources</Text>
        <Text className="text-text-50 text-l p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          assumenda excepturi sed, provident cum sapiente, aperiam at
          accusantium id alias eligendi! Ipsam in dolor quibusdam. Temporibus
          maiores autem quibusdam illum, facere illo quas iure delectus
        </Text>
      </View>
      <View className="micro-div">
        <Text className={headingStyle}>Today's Top Sources</Text>
        <Text className="text-text-50 text-l p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          assumenda excepturi sed, provident cum sapiente, aperiam at
          accusantium id alias eligendi! Ipsam in dolor quibusdam.
        </Text>
      </View>
    </View>
  );
}
