import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { OrderStatusCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import Add from "../../assets/icons/Add.svg";
import { Text } from "react-native-gesture-handler";

const SalesInvoice = ({ onPress }) => {
  const createBottomSheetRef = useRef(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await apiGet("/picker/sale_all_tasks");
        setInvoices(data.payload);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Function to close the bottom sheet
  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  return (
    <View className="flex-1 relative">
      {loading ? (
        <Text>"loading....."</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress("", "Sales Invoice", item)}>
              <OrderStatusCard
                status={item.state === "picker_pending" ? "Pending" : "Completed"}
                orderNumber={item.order_no}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
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
