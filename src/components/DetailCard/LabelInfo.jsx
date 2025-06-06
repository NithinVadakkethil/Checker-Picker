import { View, Text } from "react-native";
import React from "react";

const LabelInfo = ({ label, value }) => {
  return (
    <View className="mb-1 flex-row flex-wrap items-baseline">
      <Text className="text-xs text-[#4D4D4D] font-normal">{label}:</Text>
      <Text className="text-[#000] font-semibold text-sm ml-1">{value}</Text>
    </View>
  );
};

export default LabelInfo;
