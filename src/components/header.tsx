import { Text, TouchableOpacity, View } from "react-native";

import { dateNext, datePrev, isToday, withinWeekFromToday } from "@/utils/data";
import Ionicons from "@expo/vector-icons/build/Ionicons";

type HeaderProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export default function Header({ date, setDate }: HeaderProps) {
  // const [yest, setYest] = useState(true);

  return (
    <View className="hdr flex-row justify-between items-center p-4">
      <TouchableOpacity
        onPress={() => {
          if (withinWeekFromToday(date)) datePrev(setDate);
        }}
      >
        <Ionicons
          name="caret-back-circle-outline"
          color={withinWeekFromToday(date) ? "white" : "gray"}
          size={28}
        />
      </TouchableOpacity>
      <Text className="text-white text-2xl text-bold text-center p-4">
        {isToday(date) ? "TODAY" : date.toDateString()}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (!isToday(date)) dateNext(setDate);
        }}
      >
        <Ionicons
          name="caret-forward-circle-outline"
          color={isToday(date) ? "gray" : "white"}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
}
