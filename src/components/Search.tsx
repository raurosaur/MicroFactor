import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
  return (
    <View className="base-view py-10">
      <View className="flex-row mt-10 p-2 ">
        <TextInput
          placeholder="search food item"
          className="bg-white flex-1 rounded-l-xl"
        />
        <TouchableOpacity className=" bg-secondary-600 rounded-r-xl flex-2 items-center">
          <Text className="text-white p-2 ">Search</Text>
        </TouchableOpacity>
      </View>
      <View className="results flex-1">
        <TouchableOpacity className="">
          <Text className="bg-primary-400/30 text-text-50 p-2">
            hsbsd hiasbcbwibi uiuscxui jicxnn nmoixmsoij
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="">
          <Text className="bg-primary-400/30 text-text-50 p-2">
            hsbsd hiasbcbwibi uiuscxui jicxnn nmoixmsoij
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
