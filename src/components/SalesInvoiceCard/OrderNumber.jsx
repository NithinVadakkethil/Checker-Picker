import React from "react";
import { View, Text } from "react-native";

const OrderNumber = ({ orderNumber }) => {
  return (
    <View className="flex-row items-center">
      <Text className="text-[16px] text-[#4D4D4D] font-poppins">
        Order No:{" "}
      </Text>
      <Text className="text-[16px] text-[#000] font-[Poppins-Medium]">
        {orderNumber}
      </Text>
    </View>
  );
};

export default OrderNumber;
