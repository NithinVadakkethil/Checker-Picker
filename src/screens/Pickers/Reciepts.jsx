import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { OrderStatusCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import { useListCount } from "../../context/ListCountContext";

const Receipts = ({ onPress }) => {
  const createBottomSheetRef = useRef(null);
  const { updateListCount } = useListCount();
  const [reciepts, setReciepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformPayload = (orders) => {
    if (!Array.isArray(orders)) return [];

    return orders.flatMap((order) =>
      order.product_lines?.map((product) => ({
        id: order.id,
        move_id: product.move_id,
        product_id: product.product_id,
        product_name: product.product_name.trim(),
        expiry_date: product.expiry_date || "",
        qty: product.qty,
        uom_name: product.uom_name,
        uom_id: product.uom_id,
        state: product.state,
        reassign_reason: product.reassign_reason,
        lot_id: product.lot_id || "",
        lot_name: product.lot_name || "",
        on_hand_qty: product.on_hand_qty,
        order_no: order.order_no, // Key for grouping
        location_id: order.location_id,
        location_name: order.location_name,
        location_dest_id: order.location_dest_id,
        location_dest_name: order.location_dest_name,
      }))
    );
  };

  const groupByOrderNo = (data) => {
    const grouped = data.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = [];
      }
      acc[item.order_no].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((order_no) => {
      const items = grouped[order_no];
      let state = "picker_done"; // default

      if (
        items.some(
          (item) =>
            item.state === "picker_pending" || item.state === "reassigned"
        )
      ) {
        state = "picker_pending";
      } else if (items.every((item) => item.state === "picker_done")) {
        state = "picker_done";
      } else if (items.every((item) => item.state === "checker_verified")) {
        state = "checker_verified";
      } else {
        state = items[0].state; // fallback if needed
      }

      return {
        order_no,
        items,
        state,
      };
    });
  };

  useEffect(() => {
    const fetchReciepts = async () => {
      try {
        const response = await apiGet("/picker/receipts_all_tasks");
        if (response?.payload) {
          const transformedPayload = transformPayload(response.payload);
          //   const groupedData = groupByOrderNo(transformedPayload);
          //   const pendingCount = groupedData.filter(
          //     (item) =>
          //       item.state === "picker_pending" || item.state === "reassigned"
          //   ).length;
          //   updateListCount("saleInvoice", pendingCount);
          //   // Sort: pending ("picker_pending") first, then others
          //   const sortedData = groupedData.sort((a, b) => {
          //     const priority = {
          //       picker_pending: 0,
          //       reassigned: 1,
          //       picker_done: 2,
          //       checker_verified: 3,
          //     };

          //     return priority[a.state] - priority[b.state];
          //   });

          const groupedData = groupByOrderNo(transformedPayload);

          // Filter only pending or reassigned receipts
          const filteredData = groupedData.filter(
            (item) =>
              item.state === "picker_pending" || item.state === "reassigned"
          );

          // Update count
          const pendingCount = filteredData.length;
          updateListCount("reciepts", pendingCount);

          // You can optionally sort them if needed
          const sortedData = filteredData.sort((a, b) => {
            const priority = {
              picker_pending: 0,
              reassigned: 1,
            };
            return priority[a.state] - priority[b.state];
          });

          setReciepts(sortedData);
        } else {
          setReciepts([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReciepts();
  }, []);

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
      ) : reciepts.length < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">No datas found</Text>
        </View>
      ) : (
        <FlatList
          data={reciepts}
          keyExtractor={(item) => item.order_no} // Unique by order_no
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPress(7, "Receipts", item.items)}
            >
              <OrderStatusCard
                status={
                  item.state === "picker_pending"
                    ? "Pending"
                    : item.state === "reassigned"
                    ? "Reassigned"
                    : item.state === "checker_verified"
                    ? "Verified"
                    : "Completed"
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
      {/* <TouchableOpacity
        onPress={() => createBottomSheetRef.current.open()}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity> */}
      <CreateBottomSheet
        onClose={() => createBottomSheetRef.current.close()}
        onOpen={() => createBottomSheetRef.current.open()}
        bottomSheetRef={createBottomSheetRef}
      />
    </View>
  );
};

export default Receipts;
