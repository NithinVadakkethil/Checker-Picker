import { Text } from "react-native";
import React from "react";

const ProductName = ({ productName }) => {
  return (
    <>
      <Text className="text-[16px] font-normal text-[#00389D]">
        {productName}
      </Text>
    </>
  );
};

export default ProductName;
