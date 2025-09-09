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
  const [transferItems, setTransferItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformPayload = (orders) => {
    if (!Array.isArray(orders)) return [];

    return orders.flatMap((order) =>
      order.product_lines.map((product) => ({
        id: order.id,
        move_id: product.move_id,
        product_id: product.product_id,
        product_name: product.product_name.trim(),
        expiry_date: product.expiry_date || "Not added",
        qty: product.qty,
        uom_name: product.uom_name,
        uom_id: product.uom_id,
        state: product.state,
        reassign_reason: product.reassign_reason,
        lot_id: product.lot_id || "",
        lot_name: product.lot_name || "Not added",
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
      let state = "picker_done"; // default state

      if (items.some((item) => item.state === "picker_pending") || items.some((item) => item.state === "reassigned")) {
        state = "picker_pending";
      } else if (items.every((item) => item.state === "picker_done")) {
        state = "picker_done";
      } else if (items.every((item) => item.state === "checker_verified")) {
        state = "checker_verified";
      } else {
        state = items[0].state; // fallback
      }

      return {
        order_no,
        items,
        state,
        from: items[0].location_name,
        to: items[0].location_dest_name,
      };
    });
  };

  useEffect(() => {
    const fetchTransferItems = async () => {
      try {
        const response = await apiGet("/picker/zone_all_tasks");
        if (response?.payload) {
          const transformedPayload = transformPayload(response.payload);
          const groupedData = groupByOrderNo(transformedPayload);
          const pendingCount = groupedData.filter(
            (item) =>
              item.state === "picker_pending" || item.state === "reassigned"
          ).length;
          updateListCount("zoneTransfer", pendingCount);

          const pendingData = groupedData.filter(
            (item) => item.state === "picker_pending" || item.state === "reassigned"
          );

          setTransferItems(pendingData);
        } else {
          setTransferItems([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTransferItems();
  }, []);

  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  // Add this function to refresh data after creation
  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await apiGet("/picker/zone_all_tasks");
      if (response?.payload) {
        const transformedPayload = transformPayload(response.payload);
        const groupedData = groupByOrderNo(transformedPayload);
        const pendingCount = groupedData.filter(
          (item) =>
            item.state === "picker_pending" || item.state === "reassigned"
        ).length;
        updateListCount("zoneTransfer", pendingCount);

        const pendingData = groupedData.filter(
          (item) => item.state === "picker_pending" || item.state === "reassigned"
        );

        setTransferItems(pendingData);
      } else {
        setTransferItems([]);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
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
      ) : transferItems.length < 1 ? (
        <>
          <TouchableOpacity
            onPress={createSheetOpen}
            className="items-end mb-5"
          >
            <View className="bg-[#144D4D] px-3 py-2 rounded-md">
              <Text className="text-[#FFFFFF]">Create</Text>
            </View>
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500 text-lg">No datas found</Text>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={createSheetOpen}
            className="items-end mb-5"
          >
            <View className="bg-[#144D4D] px-3 py-2 rounded-md">
              <Text className="text-[#FFFFFF]">Create</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={transferItems}
            keyExtractor={(item) => item.order_no}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onPress(7, "Zone Transfer", item.items)}
              >
                <TransferItem
                  status={
                    item.state === "picker_pending"
                      ? "Pending"
                      : item.state === "reassigned" ? "Reassigned" : item.state === "checker_verified"
                        ? "Verified"
                        : "Completed"
                  }
                  fromZone={item.from}
                  fromColor="#2F80ED" // Adjust color dynamically if needed
                  toColor="#EB5B00"
                  toZone={item.to}
                />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </>
      )}
      <CreateBottomSheet
        onClose={createSheetClose}
        onOpen={createSheetOpen}
        bottomSheetRef={createBottomSheetRef}
        onTransferCreated={refreshData} // Add this prop
      />
    </View>
  );
};

export default ZoneTransfer;
