import React from "react";
import { View, Text } from "react-native";
import LabelInfo from "./LabelInfo";
import ProductName from "./ProductName";
import OrderHeader from "./OrderHeader";

const ProductDetails = ({
  productName,
  availableQty,
  expiryDate,
  orderNo,
  fromZone,
  status,
  uom,
  qty,
}) => {
  return (
    <View className="flex-1">
      <View className="flex-row justify-between border-b border-[#CBCBCB]/30">
      <OrderHeader orderNo={orderNo} />
        <View className="bg-[#FFF] border border-[#03BA03] px-5 py-0.4 rounded-[4px]">
          <Text className="text-[#03BA03] text-center text-base font-medium">
            {status}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between">
        <ProductName productName={productName} />
        <View className="bg-[#FFF] border border-[#03BA03] px-5 py-0.4 rounded-[4px]">
          <Text className="text-[#03BA03] text-center text-base font-medium">
            {status}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between py-4">
        <LabelInfo label={"Available Qty"} value={availableQty} />
        <LabelInfo label={"UOM"} value={uom} />
      </View>
      <View className="flex-row justify-between">
        <LabelInfo label={"Expiry Date"} value={expiryDate} />
        <Text>
          <Text className="font-normal text-xs">Qty </Text>
          <Text className="text-[#000] font-bold text-xl">{qty}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProductDetails;
