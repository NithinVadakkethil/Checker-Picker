import { View, FlatList } from "react-native";
import React from "react";
import { OrderStatusCard } from "../components";

const SalesInvoice = ({ navigation }) => {
  const dummyData = [
    { id: "1", status: "Completed", orderNumber: "1234567" },
    { id: "2", status: "Pending", orderNumber: "1234568" },
    { id: "3", status: "Pending", orderNumber: "1234569" },
    { id: "4", status: "Completed", orderNumber: "1234570" },
    { id: "5", status: "Pending", orderNumber: "1234571" },
    { id: "6", status: "Completed", orderNumber: "1234572" },
    { id: "7", status: "Pending", orderNumber: "1234573" },
    { id: "8", status: "Pending", orderNumber: "1234574" },
    { id: "9", status: "Completed", orderNumber: "1234575" },
    { id: "10", status: "Completed", orderNumber: "1234576" },
    { id: "11", status: "Completed", orderNumber: "1234577" },
    { id: "12", status: "Pending", orderNumber: "1234578" },
    { id: "13", status: "Completed", orderNumber: "1234579" },
    { id: "14", status: "Pending", orderNumber: "1234580" },
    { id: "15", status: "Completed", orderNumber: "1234581" },
    { id: "16", status: "Completed", orderNumber: "1234582" },
    { id: "17", status: "Pending", orderNumber: "1234583" },
    { id: "18", status: "Completed", orderNumber: "1234584" },
    { id: "19", status: "Pending", orderNumber: "1234585" },
    { id: "20", status: "Pending", orderNumber: "1234586" },
  ];
  
  return (
    <View className="flex-1">
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderStatusCard status={item.status} orderNumber={item.orderNumber} />
        )}
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default SalesInvoice;
