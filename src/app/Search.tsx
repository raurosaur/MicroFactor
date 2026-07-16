import { SearchResultFood } from "@/types/types";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

async function searchApi(
  query: string,
  setResults: React.Dispatch<React.SetStateAction<SearchResultFood[]>>,
) {
  if (!query.trim()) return;
  const params = new URLSearchParams({
    api_key: process.env.EXPO_PUBLIC_API_KEY as string,
    query: query.trim(),
  });
  console.log(`https://api.nal.usda.gov/fdc/v1/foods/search?${params}`);
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?${params}`,
    {
      method: "GET",
    },
  );
  console.log(res.headers.get("X-RateLimit-Remaining"));
  if (res.ok) {
    const resBody = await res.json();
    const searchResults = resBody.foods;
    setResults(searchResults);
  }
}

export default function Search() {
  const { name, date } = useLocalSearchParams();
  const [query, setQuery] = useState("");
  const [result, setResults] = useState<SearchResultFood[]>([]);
  // console.log(result);
  return (
    <View className="base-view py-10 ">
      <View className="flex-row p-2 items-center">
        <TextInput
          placeholder="search food item"
          className="bg-white flex-1 rounded-l-xl px-3 h-12 text-base text-text-800"
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity
          onPress={async () => searchApi(query, setResults)}
          className="bg-secondary-600 rounded-r-xl px-4 h-12 items-center justify-center"
        >
          <Text className="text-white font-bold text-base">Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="results flex-1">
        {result.map((item) => {
          return (
            <Link
              key={item.fdcId}
              href={{
                pathname: "/FoodItemPage",
                params: {
                  fdcId: item.fdcId,
                  description: item.description,
                  brandName: item.brandOwner ?? "",
                  nutrients: JSON.stringify(
                    item.foodNutrients?.filter(
                      (nutrient) => nutrient.value && nutrient.value > 0,
                    ),
                  ),
                  mealtime: name,
                  date: date,
                },
              }}
              push
              asChild
            >
              <TouchableOpacity className="">
                <Text className="bg-primary-400/30 text-text-50 p-2">
                  {`${item.brandOwner ?? ""} ${item.description.toLowerCase()}`}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>

      <Link href="/Meals" push asChild>
        <TouchableOpacity
          className="items-center bg-secondary-500 mt-1 p-2 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-text-50 text-2xl">Back</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
