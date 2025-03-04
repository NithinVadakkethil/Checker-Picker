import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LabelInfo from "./LabelInfo";
import ProductName from "./ProductName";
import OrderHeader from "./OrderHeader";
import Edit from "../../assets/icons/Edit.svg";
import ZoneLabel from "../TransferCard/ZoneLabel";
import Seperation from "../../assets/icons/seperationArrow.svg"

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
      <View className="flex-row justify-between items-center border-b border-[#CBCBCB]/30 pb-2">
        <OrderHeader orderNo={orderNo} />
        <TouchableOpacity>
        <View className="flex-row items-center gap-1 bg-[#FFF] border border-[#004CAB] p-1 rounded-[4px]">
          <Edit size={16} />
          <Text className="text-[#004CAB] text-center text-xs font-medium">
            Edit
          </Text>
        </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center pt-2.5">
        <ProductName productName={productName} />
        <TouchableOpacity>
        <View className="bg-[#FFF] border border-[#03BA03] px-5 py-1 rounded-[4px]">
          <Text className="text-[#03BA03] text-center text-base font-medium">
            {status}
          </Text>
        </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between py-4">
        <LabelInfo label={"Available Qty"} value={availableQty} />
        <LabelInfo label={"UOM"} value={uom} />
      </View>
      <View className="flex-row justify-between mb-4">
        <LabelInfo label={"Expiry Date"} value={expiryDate} />
        <Text>
          <Text className="font-normal text-xs">Qty </Text>
          <Text className="text-[#000] font-bold text-xl">{qty}</Text>
        </Text>
      </View>
      <View className="flex-row justify-between items-center border-b border-[#CBCBCB]/30 pb-2">
        <OrderHeader orderNo={orderNo} />
        <TouchableOpacity>
        <View className="flex-row items-center gap-1 bg-[#FFF] border border-[#004CAB] p-1 rounded-[4px]">
          <Edit size={16} />
          <Text className="text-[#004CAB] text-center text-xs font-medium">
            Edit
          </Text>
        </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center pt-2.5">
        <ProductName productName={productName} />
        <TouchableOpacity>
        <View className="bg-[#FFF] border border-[#03BA03] px-5 py-1 rounded-[4px]">
          <Text className="text-[#03BA03] text-center text-base font-medium">
            {status}
          </Text>
        </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between py-4">
        <LabelInfo label={"Available Qty"} value={availableQty} />
        <LabelInfo label={"UOM"} value={uom} />
      </View>
      <View className="flex-row justify-between items-center">
        <LabelInfo label={"Expiry Date"} value={expiryDate} />
        <Text>
          <Text className="font-normal text-xs">Qty </Text>
          <Text className="text-[#000] font-bold text-xl">{qty}</Text>
        </Text>
      </View>
      <View className="flex-row justify-between items-end">
        <ZoneLabel prefix={"From"} zone={fromZone}/>
      <Seperation height={20} width={20}/>
        <ZoneLabel prefix={"To"} zone={"Zone B"}/>
      </View>
    </View>
  );
};

export default ProductDetails;
