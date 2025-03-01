import React from "react";
import { View, Text } from "react-native";

const OrderStatus = ({ status }) => {
  return (
    <View className={`${status === "Pending" ? 'bg-[#FF5353] px-5' : 'bg-[#249F10]'} rounded-md px-3 py-1`}>
      <Text className="text-[#FFF] text-base font-medium">{status}</Text>
    </View>
  );
};

export default OrderStatus;
