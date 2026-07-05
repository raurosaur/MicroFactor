import { ScrollView, Text } from "react-native";
import NutrientElement from "../NutrientElement";

export default function MicroNutrientView() {
  const nutrient_heading_style = "text-text-50 text-2xl p-2";

  return (
    <ScrollView className="macros nutrient-view flex-[4]">
      <Text className={nutrient_heading_style}>MICRONUTRIENTS</Text>
      <NutrientElement name="Vit K" value={200} percent={70} unit="mcg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
      <NutrientElement name="Fibre" value={200} percent={70} unit="mg" />
    </ScrollView>
  );
}
