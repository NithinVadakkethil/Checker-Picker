import { View, FlatList, TouchableOpacity } from "react-native";
import React, {useRef} from "react";
import { OrderStatusCard, CreateBottomSheet } from "../components";
import Add from "../assets/icons/Add.svg";

const SalesInvoice = ({ navigation, onPress }) => {
  const createBottomSheetRef = useRef(null);
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

  // Function to close the bottom sheet
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
          <TouchableOpacity onPress={onPress}>
            <OrderStatusCard status={item.status} orderNumber={item.orderNumber} />
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

export default SalesInvoice;
