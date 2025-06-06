import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import StockTable from "../../components/Table/StockTable";
import { apiGet } from "../../utils/apiService";
import { saveStockToStorage, getSavedStockValues } from "../../utils/common";
import { debounce } from "lodash";

const StockCountView = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Regular fetch function without debounce
  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await apiGet("/picker/get_product_qty");
      const savedStocks = await getSavedStockValues();

      if (response?.payload) {
        const formattedData = response.payload.map((item) => {
          const id = item.id?.toString() || "";
          return [
            item.product_name?.trim() || "",
            savedStocks[id] ?? "0",
            item.show_actual_qty?.toString() === "true"
              ? Math.abs(item.available_qty || 0).toString()
              : "",
            item.show_actual_qty?.toString() === "true"
              ? ((item.on_hand_qty || 0) - (item.available_qty || 0)).toString()
              : "",
            id, // product id
          ];
        });
        setTableData(formattedData);
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.error("Fetch invoices error:", err);
      setError(err?.message || "An error occurred while fetching data");
      setTableData([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Create debounced version using useMemo
  const debouncedFetchInvoices = useMemo(
    () => debounce(fetchInvoices, 300),
    [fetchInvoices]
  );

  // Initial fetch on mount
  useEffect(() => {
    fetchInvoices(); // Use regular fetch for initial load

    // Cleanup debounce on unmount
    return () => {
      debouncedFetchInvoices.cancel();
    };
  }, [fetchInvoices, debouncedFetchInvoices]);

  // Retry function for error handling
  const handleRetry = useCallback(() => {
    setError(null);
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#001C4F" />
          <Text className="mt-2 text-gray-600">Loading products...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-lg text-center mb-4">{error}</Text>
          <Text
            className="text-blue-500 text-base underline"
            onPress={handleRetry}
          >
            Tap to retry
          </Text>
        </View>
      ) : tableData.length < 1 ? (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-gray-500 text-lg text-center mb-4">
            No products found
          </Text>
          <Text
            className="text-blue-500 text-base underline"
            onPress={handleRetry}
          >
            Tap to refresh
          </Text>
        </View>
      ) : (
        <StockTable
          tableData={tableData}
          fetchInvoices={debouncedFetchInvoices} // Pass debounced version for updates
          saveStockToStorage={saveStockToStorage}
        />
      )}
    </View>
  );
};

export default StockCountView;
