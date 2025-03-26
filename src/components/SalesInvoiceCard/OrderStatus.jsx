import React from "react";
import { View, Text } from "react-native";

const OrderStatus = ({ status }) => {
  return (
    <View
      className={`${
        status === "Pending"
          ? "bg-[#FF5353] px-5"
          : status === "Reassign"
          ? "bg-[#004CAB] px-4"
          : "bg-[#249F10]"
      } rounded-md px-3 py-1`}
    >
      <Text className="text-[#FFF] text-base font-medium">{status}</Text>
    </View>
  );
};

export default OrderStatus;
