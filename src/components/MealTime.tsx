import { Meal, deleteMeal } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
type MealTimeType = {
  name: string;
  meal: Meal[] | undefined;
  date: Date;
};

export default function MealTime({ name, meal, date }: MealTimeType) {
  const textStyle = "text-text-50 p-3 text-xl truncate";
  return (
    <View className="my-2">
      <View className="flex-row justify-between items-center bg-secondary-800">
        <Text className="text-white p-1 text-2xl ml-2">{name}</Text>
        <Link
          href={{
            pathname: "/Search",
            params: {
              name: name.toLowerCase(),
              date: date.getDate().toString(),
            },
          }}
          push
          asChild
        >
          <TouchableOpacity>
            <Ionicons
              name="add-circle-outline"
              className="p-3"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </Link>
      </View>
      <View>
        {meal?.map((mealItem) => (
          <TouchableOpacity
            key={mealItem.id}
            className="flex-row justify-between bg-primary-400/20 "
            onPress={() => {
              Alert.alert(
                "Delete meal?",
                `Remove ${mealItem.description} from this meal?`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      await deleteMeal(
                        mealItem.id,
                        mealItem.mealtime,
                        date.getDate(),
                      );
                      // reload meals or update state here
                    },
                  },
                ],
              );
            }}
          >
            <Text numberOfLines={1} className="text-text-50 p-3 text-xl flex-1">
              {(mealItem?.brandName + " " + mealItem.description).trim()}
            </Text>
            <Text className={textStyle}>
              {(mealItem.nutrients.macros
                .find((x) => x.nutrientId === 1008)
                ?.value.toFixed(1) ?? "Error") + " kcal"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
