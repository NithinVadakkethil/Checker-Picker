import React from "react";
import { View, Text } from "react-native";

const FormGroup = ({ label, children }) => {
  return (
    <View className="mb-4">
      <View className="mb-2">
        <Text className="text-sm font-normal text-gray-700">{label}</Text>
      </View>
      {children}
    </View>
  );
};

export default FormGroup;
