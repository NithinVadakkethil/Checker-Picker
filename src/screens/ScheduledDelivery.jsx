import { View, FlatList } from "react-native";
import React from "react";
import ScheduledDeliveryCard from "../components/ScheduledDeliveryCard/ScheduledDeliveryCard";

const ScheduledDelivery = ({ navigation }) => {
  const dummyData = [
    {
      id: 1,
      status: "Completed",
      statusColor: "green",
      orderNo: "100001",
      date: "02/04/25",
      time: "10:30AM",
    },
    {
      id: 2,
      status: "Pending",
      statusColor: "red",
      orderNo: "100002",
      date: "02/04/25",
      time: "11:00AM",
    },
    {
      id: 3,
      status: "Completed",
      statusColor: "green",
      orderNo: "100003",
      date: "02/04/25",
      time: "11:30AM",
    },
    {
      id: 4,
      status: "Cancelled",
      statusColor: "gray",
      orderNo: "100004",
      date: "02/04/25",
      time: "12:00PM",
    },
    {
      id: 5,
      status: "Pending",
      statusColor: "red",
      orderNo: "100005",
      date: "02/04/25",
      time: "12:30PM",
    },
    {
      id: 6,
      status: "Completed",
      statusColor: "green",
      orderNo: "100006",
      date: "02/04/25",
      time: "1:00PM",
    },
    {
      id: 7,
      status: "Completed",
      statusColor: "green",
      orderNo: "100007",
      date: "02/04/25",
      time: "1:30PM",
    },
    {
      id: 8,
      status: "Pending",
      statusColor: "red",
      orderNo: "100008",
      date: "02/04/25",
      time: "2:00PM",
    },
    {
      id: 9,
      status: "Cancelled",
      statusColor: "gray",
      orderNo: "100009",
      date: "02/04/25",
      time: "2:30PM",
    },
    {
      id: 10,
      status: "Completed",
      statusColor: "green",
      orderNo: "100010",
      date: "02/04/25",
      time: "3:00PM",
    },
    {
      id: 11,
      status: "Pending",
      statusColor: "red",
      orderNo: "100011",
      date: "02/04/25",
      time: "3:30PM",
    },
    {
      id: 12,
      status: "Completed",
      statusColor: "green",
      orderNo: "100012",
      date: "02/04/25",
      time: "4:00PM",
    },
  ];

  return (
    <View className="flex-1">
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ScheduledDeliveryCard
            status={item.status}
            orderNumber={item.orderNo}
            date={item.date}
            time={item.time}
          />
        )}
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default ScheduledDelivery;
