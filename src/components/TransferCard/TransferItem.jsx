import React from "react";
import { View } from "react-native";
import ZoneLabel from "./ZoneLabel";
import OrderStatus from "../SalesInvoiceCard/OrderStatus";
import Arrow from "../SalesInvoiceCard/Arrow";

const TransferItem = ({
  status,
  fromZone,
  toZone,
  fromColor,
  toColor,
}) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-sm mb-4 w-full">
      <View className="flex-row justify-between items-center">
        <OrderStatus status={status} />
        <Arrow />
      </View>
      <View className="flex-row justify-between items-center">
        <ZoneLabel prefix="From" zone={fromZone} color={fromColor} />
        <ZoneLabel prefix="To" zone={toZone} color={toColor} />
      </View>
    </View>
  );
};

export default TransferItem;
