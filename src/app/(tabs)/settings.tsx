import { setUserSettings, userSettings } from "@/utils/storage";
import { useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
export default function Settings() {
  const [age, setAge] = useState(20);
  const [isFemale, setIsFemale] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [lactating, setLactating] = useState(false);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(160);

  const radioStyle = {
    color: "white",
    labelStyle: {
      color: "white",
    },
  };
  const sexRadioButton: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "male",
        label: "Male",
        value: "male",
        ...radioStyle,
      },
      {
        id: "female",
        label: "Female",
        value: "female",
        ...radioStyle,
      },
    ],
    [],
  );
  const [sexSelectedId, setSexSelectedId] = useState<string>("male");

  const pregnantRadioButton: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "yes",
        label: "Yes",
        value: "yes",
        ...radioStyle,
      },
      {
        id: "no",
        label: "No",
        value: "no",
        selected: true,
        ...radioStyle,
      },
    ],
    [],
  );
  const [pregnantSelectedId, setPregnantSelectedId] = useState<string>("no");
  const lactatingRadioButton: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "yes",
        label: "Yes",
        value: "yes",
        ...radioStyle,
      },
      {
        id: "no",
        label: "No",
        value: "no",
        selected: true,
        ...radioStyle,
      },
    ],
    [],
  );
  const [lactatingSelectedId, setlactatingSelectedId] = useState<string>("no");
  //STYLES
  const textStyle = "text-text-50 text-xl p-2 ml-2";
  return (
    <View className="base-view justify-center">
      <View className="flex-col self-center">
        <Text className={textStyle}>Sex</Text>

        <RadioGroup
          radioButtons={sexRadioButton}
          onPress={(selectedId) => {
            setIsFemale(selectedId === "female");
            setSexSelectedId(selectedId);
          }}
          selectedId={sexSelectedId}
          containerStyle={{
            display: "flex",
            flexDirection: "row",
          }}
        />

        {isFemale && age <= 50 && age >= 14 ? (
          <View>
            <Text className={textStyle}>Pregnant?</Text>

            <RadioGroup
              radioButtons={pregnantRadioButton}
              onPress={(selectedId) => {
                setPregnant(selectedId === "yes");
                setPregnantSelectedId(selectedId);
              }}
              selectedId={pregnantSelectedId}
              containerStyle={{
                display: "flex",
                flexDirection: "row",
              }}
            />
            <Text className={textStyle}>Lactating?</Text>

            <RadioGroup
              radioButtons={lactatingRadioButton}
              onPress={(selectedId) => {
                setLactating(selectedId === "yes");
                setlactatingSelectedId(selectedId);
              }}
              selectedId={lactatingSelectedId}
              containerStyle={{
                display: "flex",
                flexDirection: "row",
              }}
            />
          </View>
        ) : (
          ""
        )}
        <Text className={textStyle}>Age</Text>
        <TextInput
          className="bg-primary-200 rounded-xl text-center text-xl mx-2"
          // value={age.toString()}
          placeholder="0-99"
          onChangeText={(age) => {
            if (Number.isInteger(+age) && +age > 0) setAge(+age);
          }}
        />
        <Text className={textStyle}>Weight</Text>
        <TextInput
          className="bg-primary-200 rounded-xl text-center text-xl mx-2"
          // value={age.toString()}
          placeholder="in kg"
          onChangeText={(weight) => {
            if (Number.isInteger(+weight) && +weight > 0) setWeight(+weight);
          }}
        />
        <Text className={textStyle}>Height</Text>
        <TextInput
          className="bg-primary-200 rounded-xl text-center text-xl mx-2"
          // value={age.toString()}
          placeholder="cm"
          onChangeText={(height) => {
            if (Number.isInteger(+height) && +height > 0) setHeight(+height);
          }}
        />
      </View>
      <TouchableOpacity
        className="bg-secondary-500 w-3/4 rounded-xl self-center m-10"
        onPress={async () => {
          const settings: userSettings = {
            age,
            isFemale,
            pregnant,
            lactating,
            height,
            weight,
          };
          await setUserSettings(settings);
        }}
      >
        <Text className={textStyle + "  text-center"}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
