import { FoodNutrient, SearchResultFood } from "@/types/types";
import { cleanNutrients } from "@/utils/data";
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

/**
 * Loads the search results to setResults.
 *
 * @remarks
 * Searches the USDA API
 *
 * @param query - the results to search
 * @param setResult - set result state
 *
 * @beta
 */
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
  // console.log(res.headers.get("x-ratelimit-remaining"));
  console.log(res.headers.get("X-RateLimit-Remaining"));
  if (res.ok) {
    const resBody = await res.json();
    const searchResults = resBody.foods;
    setResults(searchResults);
  }
}

/**
 * returns rank for a given search result given the query
 *
 * @remarks
 * Searches the USDA API
 *
 * @param a - the search result to com pare
 * @param query - query string
 * @returns score
 * @beta
 */
function rank(a: SearchResultFood, query: string) {
  const dataTypeRank: Record<string, number> = {
    Foundation: 8,
    SRLegacy: 6,
    "Survey (FNDDS)": 4,
    Branded: 0,
  };
  const options: SearchOptions = {
    exactMatchPoints: 200,
    exactContainingMatchPoints: 120,

    singleWordMatchPoints: 25,
    singleWordMatchLengthMultiplier: 1,

    uniqueSingleWordMatchPoints: 0,
    uniqueSingleWordMatchLengthMultiplier: 1,

    consecutiveWordMatchPoints: 0,
    consecutiveWordMatchLengthMultiplier: 3,

    consecutiveWordSequenceMatchPoints: 30,
    consecutiveWordSequenceLengthMultiplier: 4,

    isCaseSensitive: false,
    shouldMatchPunctuation: false,
    shouldMatchWhitespaceAndPunctuation: false,
    shouldCollapseWhitespace: true,
  };

  const score = search({ query, body: a.description, options });
  const penalty = -search({ body: a.description, query });
  return (dataTypeRank[a.dataType ?? ""] ?? -2) + score; // + penalty;
}

export default function Search() {
  const { name, date } = useLocalSearchParams();

  //STATES
  const [query, setQuery] = useState("");
  const [result, setResults] = useState<SearchResultFood[]>([]);
  const [timeoutId, setTimeoutId] = useState(0);

  //STYLES
  const BUTTON_STYLES = "text-white font-bold text-base";
  const BUTTON_STYLES_WRAPPER =
    "bg-secondary-600 rounded-r-xl px-4 h-12 items-center justify-center";

  return (
    <View className="base-view py-10 ">
      <View className="flex-col p-2 items-center">
        <View className="flex-row">
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
            className={BUTTON_STYLES_WRAPPER}
          >
            <Text className={BUTTON_STYLES}>Search</Text>
          </TouchableOpacity>
        </View>
        <Link
          href={{ pathname: "/Barcode", params: { mealtime: name, date } }}
          asChild
        >
          <TouchableOpacity
            className={BUTTON_STYLES_WRAPPER + " rounded-xl w-full m-2"}
            // onPress={scanBarcode}
          >
            <Text className={BUTTON_STYLES}>Scan Barcode</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView className="results flex-1">
        {result
          .sort((a, b) => rank(a, query) - rank(b, query))
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
                      cleanNutrients(
                        item.foodNutrients?.filter(
                          (nutrient) => nutrient.value && nutrient.value > 0,
                        ) as FoodNutrient[],
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
