import React from "react";
import { View, Text } from "react-native";

const OrderNumber = ({ orderNumber }) => {
  return (
    <View className="flex-row items-center">
      <Text className="text-[#4D4D4D] font-['Poppins'] text-base">
        Order No:{" "}
      </Text>
      <Text className="font-['Poppins'] font-medium text-base">
        {orderNumber}
      </Text>
    </View>
  );
};

export default OrderNumber;
