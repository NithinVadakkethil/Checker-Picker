import React from "react";
import { View, Text } from "react-native";

const OrderStatus = ({ status }) => {
  const getBgColor = () => {
    switch (status) {
      case "Pending":
        return "bg-[#FA6C1F] px-5";
      case "Reassign":
        return "bg-[#FF5353] px-4";
      case "Verified":
        return "bg-[#249F10] px-5";
      default:
        return "bg-[#004CAB]";
    }
  };

  return (
    <View className={`${getBgColor()} px-3 py-1 rounded-md`}>
      <Text className="text-white text-base font-medium">{status}</Text>
    </View>
  );
};

export default OrderStatus;
