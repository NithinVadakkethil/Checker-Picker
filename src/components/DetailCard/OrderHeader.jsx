import React from "react";
import { Text } from "react-native";

const OrderHeader = ({ orderNo }) => {
  return (
    <Text>
      <Text className="font-normal text-[12px] text-[rgba(0,0,0,0.90)]">
        ORDER NO
      </Text>
      <Text>: </Text>
      <Text className="font-medium text-[12px] text-[rgba(0,0,0,0.90)]">
        {orderNo}
      </Text>
    </Text>
  );
};

export default OrderHeader;
