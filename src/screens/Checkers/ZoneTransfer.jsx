import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { TransferItem, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import { useListCount } from "../../context/ListCountContext";
import Add from "../../assets/icons/Add.svg";

const ZoneTransfer = ({ navigation, onPress }) => {
  const createBottomSheetRef = useRef(null);
  const { updateListCount } = useListCount();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformPayload = (orders) => {
    if (!Array.isArray(orders)) return [];

    return orders.flatMap((order) =>
      order.product_lines?.map((product) => ({
        id: order.id,
        universalDone: order.state,
        move_id: product.move_id,
        product_id: product.product_id,
        product_name: product.product_name.trim(),
        expiry_date: product.expiry_date || "Not added",
        qty: product.qty,
        uom_name: product.uom_name,
        uom_id: product.uom_id,
        state:
          product.state === "picker_pending" ? "picker_done" : product.state,
        reassign_reason: product.reassign_reason,
        lot_id: product.lot_id || "",
        lot_name: product.lot_name || "Not added",
        on_hand_qty: product.on_hand_qty,
        order_no: order.order_no, // Key for grouping
        location_id: order.location_id,
        location_name: order.location_name,
        location_dest_id: order.location_dest_id,
        location_dest_name: order.location_dest_name,
        picker_name: order.picker_name,
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

    const groupedArray = Object.keys(grouped).map((order_no) => {
      const items = grouped[order_no];
      const hasPickerDone = items.some(
        (item) =>
          item.state === "picker_done" || item.state === "picker_pending"
      );
      const allReassigned = items.some((item) => item.state === "reassigned");
      const allVerified = items.every(
        (item) => item.state === "checker_verified"
      );

      let state = "";
      if (hasPickerDone) state = "Completed";
      else if (allReassigned) state = "Reassign";
      else if (allVerified) state = "Verified";

      return {
        order_no,
        items,
        state,
        toZone: items[0].location_dest_name,
        fromZone: items[0].location_name,
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
    const fetchTransfers = async () => {
      try {
        const response = await apiGet("/checker/zone_all_tasks");
        if (response?.payload) {
          const transformedPayload = transformPayload(response.payload);
          // const groupedData = groupByOrderNo(transformedPayload);
          // const completedCount = groupedData.filter(
          //   (group) => group.state === "Completed"
          // ).length;
          // updateListCount("checkerZoneTransfer", completedCount);
          // setTransfers(groupedData);
          const groupedData = groupByOrderNo(transformedPayload);
          // const completedTransfers = groupedData.filter(
          //   (group) => group.state === "Completed" || group.state === "Reassign"
          // );
          const completedTransfers = groupedData.filter(
            (group) =>
              group.state !== "Reassign" &&
              (group.state === "Completed" ||
                group.items.some((item) => item.universalDone !== "done"))
          );
          updateListCount("checkerZoneTransfer", completedTransfers.length);
          setTransfers(completedTransfers);
        } else {
          setTransfers([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  return (
    <View className="flex-1">
      {loading || error ? (
        <View className="flex-1 justify-center items-center">
          {loading ? (
            <ActivityIndicator size="large" color="#001C4F" />
          ) : (
            <Text className="text-red-500 text-lg">{error}</Text>
          )}
        </View>
      ) : transfers.length < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">No datas found</Text>
        </View>
      ) : (
        <FlatList
          data={transfers}
          keyExtractor={(item) => item.order_no}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPress(6, "Zone Transfer", item.items)}
            >
              <TransferItem
                status={item.state}
                fromZone={item.fromZone}
                fromColor="#2F80ED"
                toZone={item.toZone}
                toColor="#EB5B00"
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

export default ZoneTransfer;
