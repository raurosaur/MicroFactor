import { processNutriments } from "@/utils/data";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function BarcodeScanner() {
  const params = useLocalSearchParams();
  const { mealtime, date } = params;
  const [scan, setScan] = useState("scanning");
  // const nutrients = JSON.parse(params.nutrients as string);

  const [permission, requestPermission] = useCameraPermissions();
  const hasScanned = useRef(false);

  async function scanCode({ data }: BarcodeScanningResult) {
    if (hasScanned.current) return;

    hasScanned.current = true;
    const params = new URLSearchParams({
      product_type: "food",
      cc: "us",
      lc: "en",
    }).toString();
    const url = `https://world.openfoodfacts.net/api/v3/product/${data.trim()}?${params}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const body = await response.json();
    // console.log(body.product.serving_size);
    if (body.status === "failure") {
      setScan("Unable to find item");
      hasScanned.current = false;
      return;
    }
    if (!body.product.serving_quantity) {
      setScan("Not a valid food item");
      hasScanned.current = false;
      return;
    }

    setScan(body.product.brands);
    // console.log(body.product.nutriments);
    setTimeout(
      () =>
        router.replace({
          pathname: "/FoodItemPage",
          params: {
            fdcId: "000000",
            description: body.product.product_name,
            brandName: body.product.brands,
            mealtime,
            date,
            nutrients: JSON.stringify(
              processNutriments(body.product.nutriments),
            ),
            portion:
              body.product.serving_quantity +
              " " +
              body.product.serving_quantity_unit,
            serving: body.product.serving_quantity,
          },
        }),
      500,
    );
  }
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="base-view justify-center">
        <Text className="text-text-50 bg-secondary-500 p-2">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View className="base-view justify-center align-middle">
      <View className="bg-red-600 flex flex-1 max-h-40 m-20 rounded-xl">
        <CameraView style={styles.camera} onBarcodeScanned={scanCode} />
      </View>
      <Text className="font-bold text-text-50 text-center p-2">{scan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
