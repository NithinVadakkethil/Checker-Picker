import React from "react";
import { View, Text } from "react-native";

const OrderStatus = ({ status }) => {
  return (
    <View className="bg-green-50 rounded-full px-3 py-1">
      <Text className="text-green-600 text-sm font-medium">{status}</Text>
    </View>
  );
};

export default OrderStatus;
