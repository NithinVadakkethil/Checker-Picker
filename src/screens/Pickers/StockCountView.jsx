import React, { useState, useEffect} from "react";
import { View, Text, ActivityIndicator } from "react-native";
import StockTable from "../../components/Table/StockTable";
import { apiGet } from "../../utils/apiService";

const StockCountView = () => {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await apiGet("/picker/get_product_qty");
        if (response?.payload) {
          const formattedData = response.payload.map((item) => [
            item.product_name.trim(), // Product Name
            item.on_hand_qty.toString(), // On Hand Quantity
            item.reserved_qty.toString(), // Reserved Quantity
            item.available_qty.toString(), // Available Quantity
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
    };

    fetchInvoices();
  }, []);
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
      ) : (
        <StockTable tableData={tableData}/>
      )}
    </View>
  );
};

export default StockCountView;
