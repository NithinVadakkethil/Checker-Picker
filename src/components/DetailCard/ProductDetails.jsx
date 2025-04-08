import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LabelInfo from "./LabelInfo";
import ProductName from "./ProductName";
import OrderHeader from "./OrderHeader";
import Edit from "../../assets/icons/Edit.svg";
import ZoneLabel from "../TransferCard/ZoneLabel";
import Seperation from "../../assets/icons/seperationArrow.svg";
import Plus from "../../assets/icons/plus.svg";

const ProductDetails = ({
  productName,
  availableQty,
  expiryDate,
  orderNo,
  fromZone,
  status,
  uom,
  qty,
  onPress,
  fromColor,
  toColor,
  toZone,
  onStatusChange,
  moveId,
  index,
  type,
  pickerName,
}) => {
  console.log("orderNo---->", orderNo)
  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center border-b border-[#CBCBCB]/30">
        {orderNo && (
          <>
            <OrderHeader orderNo={orderNo} />
            {type === "Checker" && (
              <TouchableOpacity onPress={onPress} className="pb-1">
                <Plus height={20} width={20} />
              </TouchableOpacity>
            )}
            {status !== "Done" && type !== "Checker" && (
              <TouchableOpacity onPress={onPress} className="pb-1">
                <View className="flex-row items-center gap-1 bg-[#FFF] border border-[#004CAB] p-1 rounded-[4px]">
                  <Edit size={16} />
                  <Text className="text-[#004CAB] text-center text-xs font-medium">
                    Edit
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {!orderNo && status !== "Done" && type !== "Checker" && (
        <View className="items-end pt-2">
          <TouchableOpacity onPress={onPress}>
            <View className="flex-row items-center gap-1 bg-[#FFF] border border-[#004CAB] p-1 rounded-[4px]">
              <Edit size={16} />
              <Text className="text-[#004CAB] text-center text-xs font-medium">
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {!orderNo && type === "Checker" && (
        <View className="items-end pt-2">
          <TouchableOpacity onPress={onPress} className="pb-1">
            <Plus height={20} width={20} />
          </TouchableOpacity>
        </View>
      )}
      {type === "Checker" ? (
        <View className="flex-row justify-between items-center pt-2.5">
          <ProductName productName={productName} />
          {status === "Done" ? (
            <View className="bg-[#FFF] border border-[#03BA03] px-5 py-1 rounded-[4px]">
              <Text className="text-[#03BA03] text-center text-base font-medium">
                Verified
              </Text>
            </View>
          ) : status === "Reassigned" ? (
            <View className="bg-[#FFF] border border-[#004CAB] px-5 py-1 rounded-[4px]">
              <Text className="text-[#004CAB] text-center text-base font-medium">
                Reassigned
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => onStatusChange(moveId)}>
              <View className="bg-[#DAE1E3] px-5 py-1 rounded-[4px] shadow-sm shadow-black/10">
                <Text className="text-[#000000E5] text-center text-base font-medium">
                  Verify
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View className="flex-row justify-between items-center pt-2.5">
          <ProductName productName={productName} />
          {status === "Done" ? (
            <View className="bg-[#FFF] border border-[#03BA03] px-5 py-1 rounded-[4px]">
              <Text className="text-[#03BA03] text-center text-base font-medium">
                Done
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => onStatusChange(moveId)}>
              <View className="bg-[#DAE1E3] px-5 py-1 rounded-[4px] shadow-sm shadow-black/10">
                <Text className="text-[#000000E5] text-center text-base font-medium">
                  Done
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      {type === "Checker" && (
        <View className="flex-row justify-between pt-1">
          <LabelInfo label={"Picker"} value={pickerName} />
        </View>
      )}
      <View className="flex-row justify-between py-2">
        <LabelInfo label={"Available Qty"} value={availableQty} />
        <LabelInfo label={"UOM"} value={`${qty} ${uom}`} />
      </View>
      <View className="flex-row justify-between items-center">
        <LabelInfo label={"Expiry Date"} value={expiryDate} />
        <Text>
          <Text className="font-normal text-xs">Qty </Text>
          <Text className="text-[#000] font-bold text-xl">{qty}</Text>
        </Text>
      </View>
      <View className={`flex-row justify-between items-end`}>
        <ZoneLabel prefix={"From"} zone={fromZone} color={fromColor} />
        <Seperation height={20} width={20} />
        <ZoneLabel
          prefix={"To"}
          zone={toZone}
          color={toColor}
          textAlign={"right"}
        />
      </View>
    </View>
  );
};

export default ProductDetails;
