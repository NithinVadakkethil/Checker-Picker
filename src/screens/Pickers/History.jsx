import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { apiGet } from "../../utils/apiService";
import Menu from "../../assets/icons/menu.svg";

const HistoryItem = ({ initials, text, time, fromZone, toZone }) => (
  <View className="flex-row items-center p-4 bg-white rounded-lg mb-3">
    <View className="w-12 h-12 rounded-full bg-[#F1F1F1] mr-4 items-center justify-center">
      <Text className="text-[#0E0C0C] text-lg font-medium">{initials}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-sm font-inter mb-1">
        {text.split(fromZone)[0]}
        <Text className="text-[#000] font-bold">{fromZone}</Text>
        {text.split(fromZone)[1].split(toZone)[0]}
        <Text className="text-[#000] font-bold">{toZone}</Text>
        {text.split(toZone)[1]}
      </Text>
      <Text className="text-[#8B8586] text-xs">{time}</Text>
    </View>
  </View>
);

const History = () => {
  const [history, setHistory] = useState([]);
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
    const grouped = data?.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = [];
      }
      acc[item.order_no].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((order_no) => ({
      order_no,
      items: grouped[order_no], // All details for this order_no
      state: grouped[order_no][0].state, // Take state from first item
    }));
  };

  const generateInitials = (productName) => {
    // Remove the ID part (e.g., "[1094]") and trim whitespace
    const nameWithoutID = productName
      .replace(/\[\d+\]\s*/, "")
      .replace(/["\t]/g, "")
      .trim();
  
    // Split the words and take the first letter of each
    const initials = nameWithoutID
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase(); // Ensure uppercase initials
  
    // Return only the first three characters
    return initials.slice(0, 3);
  };  

  const transformHistory = (orders) => {
    return orders.flatMap((order) =>
      order.items.map((item) => ({
        id: order.id,
        order_no: order.order_no,
        product_name: item.product_name.replace(/["\t]/g, "").trim(),
        product_initials: generateInitials(item?.product_name),
        location_id: item.location_id,
        location_name: item.location_name,
        location_dest_id: item.location_dest_id,
        location_dest_name: item.location_dest_name,
      }))
    );
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiGet("/picker/history");
        if (response?.payload) {
          const transformedPayload = transformPayload(response.payload);
          const groupedData = groupByOrderNo(transformedPayload);
          const historyData = transformHistory(groupedData);
          setHistory(historyData);
        } else {
          setHistory([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-xl font-semibold">History</Text>
          <Text className="text-base font-normal">Last 7 days</Text>
        </View>
        {/* <TouchableOpacity
          className="p-2.5 bg-white rounded-xl items-center justify-center"
          onPress={handleLogout}
        >
          <Menu size={24} />
        </TouchableOpacity> */}
      </View>
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
          data={history}
          keyExtractor={(item, index) => index} // Ensure key is a string
          renderItem={({ item }) => (
            <HistoryItem
              key={item.id}
              initials={item.product_initials || "IT"}
              text={`${item?.product_name} Transferred From Zone ${item.location_name} to Zone ${item.location_dest_name}`}
              fromZone={`Zone ${item.location_name}`}
              toZone={`Zone ${item.location_dest_name}`}
              time={item.time || "5:00"}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

export default History;
