import { View, FlatList, TouchableOpacity } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { ScheduledDeliveryCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import Add from "../../assets/icons/Add.svg";

const ScheduledDelivery = ({ navigation, onPress }) => {
  const createBottomSheetRef = useRef(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformPayload = (orders) => {
    if (!Array.isArray(orders)) return [];

    return orders.flatMap(order =>
      order.product_lines.map(product => ({
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
        order_no: order.order_no, // Key for grouping
        location_id: order.location_id,
        location_name: order.location_name,
        location_dest_id: order.location_dest_id,
        location_dest_name: order.location_dest_name,
        scheduled_date: order.scheduled_date,
        scheduled_time: order.scheduled_time
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

    return Object.keys(grouped).map(order_no => ({
      order_no,
      items: grouped[order_no], // All details for this order_no
      state: grouped[order_no][0].state, // Take state from first item
      date: grouped[order_no][0].scheduled_date,
      time: grouped[order_no][0].scheduled_time,
    }));
  };

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await apiGet("/picker/scheduled_tasks");
        if (response?.payload) {
          const transformedPayload = transformPayload(response.payload);
          const groupedData = groupByOrderNo(transformedPayload);
          setDeliveries(groupedData);
        } else {
          setDeliveries([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  return (
    <View className="flex-1 relative">
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.order_no} // Unique by order_no
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress("", "Scheduled Delivery", item.items)}>
            <ScheduledDeliveryCard
              status={item.state === "picker_pending" ? "Pending" : "Completed"}
              orderNumber={item.order_no}
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
