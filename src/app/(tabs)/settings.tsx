import { useAuth } from "@/context/auth";
import { setUserSettings, userSettings } from "@/utils/storage";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [age, setAge] = useState(20);
  const [isFemale, setIsFemale] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [lactating, setLactating] = useState(false);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(160);
  const [protein, setProtein] = useState(0.3);
  const [fats, setFats] = useState(0.3);
  const [carbs, setCarbs] = useState(0.4);
  const [act, setAct] = useState(1);

  const radioStyle = {
    color: "white",
    labelStyle: {
      color: "white",
    },
  };
  const macroInputStyle = "flex-row";
  //RADIO BUTTON: SEX
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

  //RADIO BUTTON: PREGNANCY
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

  //RADIO BUTTON: LACTATION
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

  //RADIO BUTTON: ACTIVIY
  const actRadioButton: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1.2",
        label: "Sedentary",
        value: "1.2",
        selected: true,
        ...radioStyle,
      },
      {
        id: "1.375",
        label: "Lightly Active",
        value: "1.375",
        ...radioStyle,
      },
      {
        id: "1.55",
        label: "Moderately Active",
        value: "1.55",
        ...radioStyle,
      },
      {
        id: "1.725",
        label: "Active",
        value: "1.725",
        ...radioStyle,
      },
      {
        id: "1.9",
        label: "Very Active",
        value: "1.9",
        ...radioStyle,
      },
    ],
    [],
  );
  const [actSelectedId, setActSelectedId] = useState<string>("1.2");

  //STYLES
  const textStyle = "text-text-50 text-xl p-2 ml-2";

  const { user, isLoading, signIn, signOut } = useAuth();
  console.log(user);

  const styles = StyleSheet.create({
    image: { width: "100%", height: "100%", resizeMode: "cover" },
    accountHeader: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
  });

  function logout() {
    Alert.alert("Logout", "Do you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  }
  return (
    <SafeAreaView className="base-view">
      {user ? (
        <View style={styles.accountHeader}>
          <Text className="p-6 text-text-200 text-2xl content-center font-bold">
            {user?.name?.toLocaleUpperCase()}
          </Text>
          <TouchableOpacity
            className="self-end m-2 rounded-full w-16 h-16 overflow-hidden"
            onPress={logout}
          >
            <Image style={styles.image} source={{ uri: user?.picture }} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="self-center p-4 bg-primary-500 rounded-xl m-2"
          onPress={signIn}
        >
          <Text className="text-text-200">SignIn using Google</Text>
        </TouchableOpacity>
      )}

      <View className="flex-col p-2 flex-1">
        <View className="flex-row">
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
        </View>

        {(isFemale && age <= 50 && age >= 14) ?? (
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
        <View className="flex-row m-5">
          <Text className={textStyle}>Weight</Text>
          <TextInput
            className="bg-primary-200 rounded-xl text-center text-xl mx-2 w-20"
            // value={age.toString()}
            placeholder="in kg"
            onChangeText={(weight) => {
              if (Number.isInteger(+weight) && +weight > 0) setWeight(+weight);
            }}
          />
          <Text className={textStyle}>Height</Text>
          <TextInput
            className="bg-primary-200 rounded-xl text-center text-xl mx-2 w-20"
            placeholder="cm"
            onChangeText={(height) => {
              if (Number.isInteger(+height) && +height > 0) setHeight(+height);
            }}
          />
        </View>
        <Text className={textStyle}>Activity Level?</Text>
        <RadioGroup
          radioButtons={actRadioButton}
          onPress={(selectedId) => {
            setAct(+selectedId);
            setActSelectedId(selectedId);
          }}
          selectedId={actSelectedId}
          containerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        />
        <View className="flex-row my-4 flex-wrap justify-evenly">
          <View className={macroInputStyle}>
            <Text className={textStyle}>Protein</Text>
            <TextInput
              className="bg-primary-200 rounded-xl text-center text-xl w-14"
              placeholder="30%"
              onChangeText={(protein) => {
                if (Number.isInteger(+protein)) setProtein(+protein / 100);
              }}
            />
          </View>
          <View className={macroInputStyle}>
            <Text className={textStyle}>Fats</Text>
            <TextInput
              className="bg-primary-200 rounded-xl text-center text-xl w-14"
              placeholder="30%"
              onChangeText={(fats) => {
                if (Number.isInteger(+fats)) setFats(+fats / 100);
              }}
            />
          </View>
          <View className={macroInputStyle}>
            <Text className={textStyle}>Carbs</Text>
            <TextInput
              className="bg-primary-200 rounded-xl text-center text-xl w-14"
              placeholder="40%"
              onChangeText={(carbs) => {
                if (Number.isInteger(+carbs)) setCarbs(+carbs / 100);
              }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-secondary-500 w-3/4 rounded-xl self-center m-10 "
        onPress={async () => {
          if (protein + fats + carbs !== 1) {
            Alert.alert("error", "Macros must add up to 100");
            return;
          }
          const settings: userSettings = {
            age,
            isFemale,
            pregnant,
            lactating,
            height,
            weight,
            protein,
            fats,
            carbs,
            act,
          };
          await setUserSettings(settings);
        }}
      >
        <Text className={textStyle + "  text-center"}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
