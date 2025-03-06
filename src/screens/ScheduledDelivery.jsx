import { View, FlatList, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { ScheduledDeliveryCard, CreateBottomSheet } from "../components";
import Add from "../assets/icons/Add.svg";

const ScheduledDelivery = ({ navigation, onPress }) => {
  const createBottomSheetRef = useRef(null);
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

  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  return (
    <View className="flex-1 relative">
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress("", "Scheduled Delivery")}>
            <ScheduledDeliveryCard
              status={item.status}
              orderNumber={item.orderNo}
              date={item.date}
              time={item.time}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <TouchableOpacity
        onPress={createSheetOpen}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity>
      <CreateBottomSheet
        onClose={createSheetClose}
        onOpen={createSheetOpen}
        bottomSheetRef={createBottomSheetRef}
      />
    </View>
  );
};

export default ScheduledDelivery;
