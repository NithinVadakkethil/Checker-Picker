import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import StockTable from "../../components/Table/StockTable";
import { apiGet } from "../../utils/apiService";
import { debounce } from "lodash";

const StockCountView = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounced API call
  const fetchInvoices = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const response = await apiGet("/picker/get_product_qty");
        if (response?.payload) {
          const formattedData = response?.payload?.map((item) => [
            item.product_name.trim(),
            item.on_hand_qty.toString(),
            item.available_qty.toString(),
            item.available_qty.toString(),
          ]);
          setTableData(formattedData);
        } else {
          setTableData([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchInvoices();
    // Cleanup the debounce on unmount
    return () => fetchInvoices.cancel();
  }, [fetchInvoices]);

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#001C4F" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">{error}</Text>
        </View>
      ) : tableData.length < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">No data found</Text>
        </View>
      ) : (
        <StockTable tableData={tableData} />
      )}
    </View>
  );
};

export default StockCountView;
