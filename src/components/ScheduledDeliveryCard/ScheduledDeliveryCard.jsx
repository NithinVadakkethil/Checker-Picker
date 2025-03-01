import { View } from "react-native";
import React from "react";
import OrderStatus from "../SalesInvoiceCard/OrderStatus";
import Arrow from "../SalesInvoiceCard/Arrow";
import ZoneLabel from "../TransferCard/ZoneLabel";
import OrderNumber from "../SalesInvoiceCard/OrderNumber";

const ScheduledDeliveryCard = ({ status, date, time, orderNumber }) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-sm mb-4 w-full">
      <View className="flex-row justify-between items-center">
        <OrderStatus status={status} />
        <OrderNumber orderNumber={orderNumber}/>
        <Arrow />
      </View>
      <View className="flex-row justify-between items-center">
        <ZoneLabel prefix="Date:" zone={""} dateTime={date} color={"#4D4D4D"} />
        <ZoneLabel prefix="Time:" zone={""} dateTime={time} color={"#4D4D4D"} />
      </View>
    </View>
  );
};

export default ScheduledDeliveryCard;
