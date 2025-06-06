import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import StockTable from "../../components/Table/StockTable";
import { apiGet } from "../../utils/apiService";
import { updateCurrentStock } from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const StockCountView = () => {
  const toast = useToast();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiGet("/picker/get_product_qty");
      
      if (response.statusOk && response.payload) {
        // Transform API data to table format
        const transformedData = response.payload.map(item => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.product_name,
          current_stock: 0, // Initially zero as requested
          actual_field: item.show_actual_qty ? item.available_qty : null,
          balance: item.show_actual_qty ? (item.on_hand_qty - item.available_qty) : null,
          show_actual_qty: item.show_actual_qty,
          on_hand_qty: item.on_hand_qty,
          available_qty: item.available_qty
        }));
        
        setTableData(transformedData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const result = await updateCurrentStock(productId, newQuantity);
      
      if (result.success) {
        console.log('Quantity updated successfully:', result.message);
        toast.show("Stock updated", {
          type: "Success", // Changed from "Success" to "success"
        });
        // Update local state
        setTableData(prevData => 
          prevData.map(item => 
            item.product_id === productId 
              ? { ...item, current_stock: newQuantity }
              : item
          )
        );
      } else {
        console.error('Failed to update quantity:', result.message);
        // You might want to show an error message to the user here
        toast.show(result.message, {
          type: "error",
        });
      }
      
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

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
        <StockTable 
          tableData={tableData} 
          onUpdateQuantity={updateQuantity}
        />
      )}
    </View>
  );
};

export default StockCountView;