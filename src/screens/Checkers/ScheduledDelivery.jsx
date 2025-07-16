import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { ScheduledDeliveryCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import { useListCount } from "../../context/ListCountContext";
import Add from "../../assets/icons/Add.svg";

const ScheduledDelivery = ({ navigation, onPress }) => {
  const createBottomSheetRef = useRef(null);
  const { updateListCount } = useListCount();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformData = (apiResponse) => {
    return apiResponse.flatMap((sale) =>
      sale.pickings.flatMap((picking) =>
        picking.product_lines.map((product) => ({
          sale_id: sale.sale_id,
          id: picking.id,
          universalDone: sale.state,
          order_no: picking.order_no,
          location_id: picking.location_id,
          location_name: picking.location_name,
          location_dest_id: picking.location_dest_id,
          location_dest_name: picking.location_dest_name,
          move_id: product.move_id,
          product_id: product.product_id,
          product_name: product.product_name,
          on_hand_qty: product.on_hand_qty,
          expiry_date: product.expiry_date || "Not added",
          qty: product.qty,
          uom_name: product.uom_name,
          uom_id: product.uom_id,
          state: product.state,
          reassign_reason: product.reassign_reason,
          lot_id: product.lot_id,
          lot_name: product.lot_name || "Not added",
          picker_id: picking.picker_id,
          picker_name: picking.picker_name,
          scheduled_date: picking.scheduled_date,
          scheduled_time: picking.scheduled_time,
        }))
      )
    );
  };

  const convertTo12HourFormat = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12; // 0 => 12
    return `${hour12}:${minute} ${ampm}`;
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
        date: group.items[0].scheduled_date || "",
        time: convertTo12HourFormat(group.items[0].scheduled_time || ""),
        // Optional: add more metadata here like date/time if needed
      };
    });

    // Sort to show Completed first
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
    const fetchDeliveries = async () => {
      try {
        const response = await apiGet("/checker/scheduled_delivery");
        if (response?.payload) {
          // const transformedPayload = transformData(response.payload);
          // const groupedData = groupByOrderNo(transformedPayload);
          // const pendingCount = groupedData.filter(
          //   (item) => item.status === "Completed"
          // ).length;

          // updateListCount("checkerScheduledDelivery", pendingCount);
          // setDeliveries(groupedData);
          const transformedPayload = transformData(response.payload);
          const groupedData = groupByOrderNo(transformedPayload);

          // Filter only Completed status
          // const completedDeliveries = groupedData.filter(
          //   (item) => item.status === "Completed" || item.status === "Reassign"
          // );
          const completedDeliveries = groupedData.filter(
            (group) =>
              group.status !== "Reassign" &&
              (group.status === "Completed" || group.items.some(item => item.universalDone !== "done"))
          );
          

          updateListCount(
            "checkerScheduledDelivery",
            completedDeliveries.length
          );
          setDeliveries(completedDeliveries);
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
      {loading || error ? (
        <View className="flex-1 justify-center items-center">
          {loading ? (
            <ActivityIndicator size="large" color="#001C4F" />
          ) : (
            <Text className="text-red-500 text-lg">{error}</Text>
          )}
        </View>
      ) : deliveries?.length < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">No datas found</Text>
        </View>
      ) : (
        <FlatList
          data={deliveries}
          keyExtractor={(item) => item.order_no}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPress(6, "Scheduled Delivery", item.items)}
            >
              <ScheduledDeliveryCard
                status={item.status}
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

export default ScheduledDelivery;
