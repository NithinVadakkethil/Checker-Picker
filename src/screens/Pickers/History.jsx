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
import Sale from "../../assets/icons/sale.svg";
import Scheduled from "../../assets/icons/scheduled.svg";
import Zone from "../../assets/icons/zone.svg";
import { getTimeAgo } from "../../utils/common";

const HistoryItem = ({ initials, time, orderNo, type }) => (
  <View className="flex-row items-center p-4 bg-white rounded-lg mb-3 gap-3">
    {initials === "Sale" ? (
      <Sale />
    ) : initials === "Zone" ? (
      <Zone />
    ) : (
      <Scheduled />
    )}
    <View className="flex-1">
      <Text className="text-sm font-inter mb-1">
        {type === "Sale" ? (
          <>
            Sale Invoice <Text className="font-bold">{orderNo}</Text> is
            Completed
          </>
        ) : type === "Zone" ? (
          <>
            Zone transfer <Text className="font-bold">{orderNo}</Text> is
            Completed
          </>
        ) : (
          <>
            Scheduled Delivery <Text className="font-bold">{orderNo}</Text> is
            Completed
          </>
        )}
      </Text>
      <Text className="text-[#8B8586] text-xs">{time}</Text>
    </View>
  </View>
);

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformHistoryData = (data) => {
    const result = [];

    data?.forEach((item) => {
      item.products.forEach((product) => {
        result.push({
          ...item,
          product_initials: generateInitials(product),
          product_name: product.replace(/["\t]/g, "").trim(), // add one product at a time
        });
      });
    });

    return {
      ...data,
      payload: result,
    };
  };

  const generateInitials = (productName) => {
    const nameWithoutID = productName
      .replace(/\[\d+\]\s*/, "") // Remove [ID]
      .replace(/["\t]/g, "") // Remove quotes, tabs
      .replace(/-/g, " ") // Replace hyphens with space
      .trim();

    // Filter out words that contain any digits (e.g., "24X500G")
    const validWords = nameWithoutID
      .split(/\s+/)
      .filter((word) => /^[A-Za-z]+$/.test(word)); // Keep only pure alphabetic words

    const initials = validWords
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return initials.slice(0, 3); // Return up to 3 characters
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiGet("/picker/history");
        if (response?.payload) {
          const transformedPayload = transformHistoryData(response.payload);
          // const groupedData = groupByOrderNo(transformedPayload);
          // const historyData = transformHistory(groupedData);
          setHistory(transformedPayload);
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
          <Text className="text-base font-normal pt-1.5">Last 7 days</Text>
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
      ) : history?.payload.length < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">No datas found</Text>
        </View>
      ) : (
        <FlatList
          data={history?.payload}
          keyExtractor={(item, index) => index} // Ensure key is a string
          renderItem={({ item }) => (
            <HistoryItem
              key={item.id}
              initials={item.type}
              type={item.type}
              orderNo={item.order_no}
              time={getTimeAgo(item?.date)}
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
