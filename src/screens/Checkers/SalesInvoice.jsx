import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { OrderStatusCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import Add from "../../assets/icons/Add.svg";
import { Text } from "react-native-gesture-handler";

const SalesInvoice = ({ onPress }) => {
  const createBottomSheetRef = useRef(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformSalesInvoices = (data) => {
    const ordersMap = new Map();
  
    data?.forEach((sale) => {
      sale.pickings.forEach((picking) => {
        const { order_no, sale_id, id, location_id, location_name, location_dest_id, location_dest_name, state, picker_id, picker_name, product_lines } = picking;
  
        if (!ordersMap.has(order_no)) {
          ordersMap.set(order_no, {
            sale_id,
            order_no,
            id,
            location_id,
            location_name,
            location_dest_id,
            location_dest_name,
            state,
            picker_id,
            picker_name,
            product_lines: [...product_lines], // Clone the array
          });
        } else {
          // Merge product lines if order number already exists
          ordersMap.get(order_no).product_lines.push(...product_lines);
        }
      });
    });
  
    return Array.from(ordersMap.values());
  };
  
  

  // const groupByOrderNo = (data) => {
  //   const grouped = data?.reduce((acc, item) => {
  //     if (!acc[item.order_no]) {
  //       acc[item.order_no] = [];
  //     }
  //     acc[item.order_no].push(item);
  //     return acc;
  //   }, {});

  //   return Object.keys(grouped).map((order_no) => ({
  //     order_no,
  //     items: grouped[order_no], // All details for this order_no
  //     state: grouped[order_no][0].state, // Take state from first item
  //   }));
  // };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiGet("/checker/sale_all_tasks");
        if (response?.payload) {
          const transformedPayload = transformSalesInvoices(response.payload);
          // const groupedData = groupByOrderNo(transformedPayload);
          setInvoices(transformedPayload);
        } else {
          setInvoices([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
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

  console.log("invoices--->", invoices);

  return (
    <View className="flex-1 relative">
      {loading || error ? (
        <View className="flex-1 justify-center items-center">
          {loading ? (
            <ActivityIndicator size="large" color="#001C4F" />
          ) : (
            <Text className="text-red-500 text-lg">{error}</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPress(6, "Sales Invoice", item)}
            >
              <OrderStatusCard
                status={
                  item.state === "picker_done" ? "Completed" : "Reassign"
                }
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
