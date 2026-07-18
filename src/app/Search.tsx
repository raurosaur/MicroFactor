import { SearchResultFood } from "@/types/types";
import { search, SearchOptions } from "@pdfnav/smart-text-search";
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
    // sortBy: "lowercaseDescription.keyword",
  });
  console.log(`https://api.nal.usda.gov/fdc/v1/foods/search?${params}`);
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?${params}`,
    {
      method: "GET",
    },
  );
  // console.log(res.headers.get("x-ratelimit-remaining"));
  console.log(res.headers.get("X-RateLimit-Remaining"));
  if (res.ok) {
    const resBody = await res.json();
    const searchResults = resBody.foods;
    setResults(searchResults);
  }
}
const dataTypeRank: Record<string, number> = {
  Foundation: 8,
  SRLegacy: 6,
  "Survey (FNDDS)": 4,
  Branded: 0,
};
export default function Search() {
  const { name, date } = useLocalSearchParams();
  const [query, setQuery] = useState("");
  const [result, setResults] = useState<SearchResultFood[]>([]);
  const [timeoutId, setTimeoutId] = useState(0);

  // console.log(result);
  return (
    <View className="base-view py-10 ">
      <View className="flex-row p-2 items-center">
        <TextInput
          placeholder="search food item"
          className="bg-white flex-1 rounded-l-xl px-3 h-12 text-text-800 font-semibold text-xl"
          value={query}
          onChangeText={async (text) => {
            clearTimeout(timeoutId);
            setTimeoutId(
              setTimeout(async () => {
                if (text && text.length > 3) {
                  await searchApi(text, setResults);
                }
              }, 1000),
            );
            setQuery(text);
          }}
        />

        <TouchableOpacity
          onPress={async () => searchApi(query, setResults)}
          className="bg-secondary-600 rounded-r-xl px-4 h-12 items-center justify-center"
        >
          <Text className="text-white font-bold text-base">Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="results flex-1">
        {result
          .sort((a, b) => {
            const options: SearchOptions = {
              exactMatchPoints: 120,
              exactContainingMatchPoints: 90,

              singleWordMatchPoints: 2,
              singleWordMatchLengthMultiplier: 1,

              uniqueSingleWordMatchPoints: 4,
              uniqueSingleWordMatchLengthMultiplier: 1,

              consecutiveWordMatchPoints: 25,
              consecutiveWordMatchLengthMultiplier: 3,

              consecutiveWordSequenceMatchPoints: 30,
              consecutiveWordSequenceLengthMultiplier: 4,

              isCaseSensitive: false,
              shouldMatchPunctuation: false,
              shouldMatchWhitespaceAndPunctuation: false,
              shouldCollapseWhitespace: true,
            };
            const rankA =
              (dataTypeRank[a.dataType ?? ""] ?? -2) +
              search({ query, body: a.description, options });
            const rankB =
              (dataTypeRank[b.dataType ?? ""] ?? -2) +
              search({ query, body: b.description, options });

            return rankB - rankA;
          })
          .map((item) => {
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
                  <Text className="bg-primary-400/30 text-text-50 text-xl p-1 my-[0.5]">
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
