import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { OrderStatusCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import { useListCount } from "../../context/ListCountContext";
import Add from "../../assets/icons/Add.svg";

const Reciepts = ({ onPress }) => {
  const createBottomSheetRef = useRef(null);
  const { updateListCount } = useListCount();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (apiResponse) => {
    return apiResponse.flatMap((sale) =>
      sale.pickings.flatMap((picking) =>
        picking.product_lines.map((product) => ({
          sale_id: sale.sale_id,
          id: picking.id,
          order_no: picking.order_no,
          location_id: picking.location_id,
          location_name: picking.location_name,
          location_dest_id: picking.location_dest_id,
          location_dest_name: picking.location_dest_name,
          move_id: product.move_id,
          product_id: product.product_id,
          product_name: product.product_name,
          on_hand_qty: product.on_hand_qty,
          expiry_date: product.expiry_date,
          qty: product.qty,
          uom_name: product.uom_name,
          uom_id: product.uom_id,
          state: product.state,
          reassign_reason: product.reassign_reason,
          lot_id: product.lot_id,
          lot_name: product.lot_name,
          picker_id: picking.picker_id,
          picker_name: picking.picker_name,
        }))
      )
    );
  };

  const groupByOrderNo = (data) => {
    const grouped = data.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = {
          order_no: item.order_no,
          items: [],
        };
      }
      acc[item.order_no].items.push(item);
      return acc;
    }, {});

    const groupedArray = Object.values(grouped).map((group) => {
      const hasPickerDone = group.items.some(
        (item) => item.state === "picker_done"
      );
      const allReassigned = group.items.some(
        (item) => item.state === "reassigned"
      );
      const allVerified = group.items.every(
        (item) => item.state === "checker_verified"
      );

      let status = "";
      if (hasPickerDone) status = "Completed";
      else if (allReassigned) status = "Reassign";
      else if (allVerified) status = "Verified";

      return {
        ...group,
        status,
      };
    });

    // Sort: Completed first, then Reassign, then In Progress
    return groupedArray.sort((a, b) => {
      const priority = {
        Completed: 0,
        Reassign: 1,
        Verified: 2,
      };
      return priority[a.status] - priority[b.status];
    });
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiGet("/checker/receipts_all_tasks");
        if (response?.payload) {
          const transformedPayload = transformData(response.payload);
          // const groupedData = groupByOrderNo(transformedPayload); // Group by order number
          // const completedCount = groupedData.filter(
          //   (group) => group.status === "Completed"
          // ).length;
          // updateListCount("checkerSaleInvoice", completedCount);
          // setInvoices(groupedData);
          const groupedData = groupByOrderNo(transformedPayload); // Group by order number
          const completedOrders = groupedData.filter(
            (group) => group.status === "Completed"
          );
          updateListCount("checkerReciepts", completedOrders.length);
          setInvoices(completedOrders);
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
      ) : invoices.length < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">No datas found</Text>
        </View>
      ) : (
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.order_no}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPress(6, "Reciepts", item.items)}
            >
              <OrderStatusCard
                status={item.status}
                orderNumber={item.order_no}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
      {/* <TouchableOpacity
        onPress={createSheetOpen}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity> */}
      <CreateBottomSheet
        onClose={createSheetClose}
        onOpen={createSheetOpen}
        bottomSheetRef={createBottomSheetRef}
      />
    </View>
  );
};

export default Reciepts;
