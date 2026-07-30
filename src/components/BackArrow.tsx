import { datePrev, withinWeekFromToday } from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

type backArrowProps = {
  onPress?: ((event?: GestureResponderEvent) => void) | undefined;
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date>> | undefined;
  color?: string;
};

function PreviousDayOnPress(
  date: Date,
  setDate: React.Dispatch<React.SetStateAction<Date>> | undefined,
) {
  if (withinWeekFromToday(date) && setDate) datePrev(setDate);
}

function DefaultColor(date: Date) {
  return withinWeekFromToday(date) ? "white" : "gray";
}
export default function BackArrow({
  onPress = () => PreviousDayOnPress(date, setDate),
  date = new Date(),
  setDate = undefined,
  color = DefaultColor(date),
}: backArrowProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <Ionicons name="caret-back-circle-outline" color={color} size={28} />
    </TouchableOpacity>
  );
}
