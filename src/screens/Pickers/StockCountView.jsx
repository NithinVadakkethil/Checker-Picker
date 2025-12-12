import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StockTable from "../../components/Table/StockTable";
import { apiGet } from "../../utils/apiService";
import { updateCurrentStock } from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const StockCountView = () => {
  const toast = useToast();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // AsyncStorage keys
  const STOCK_STORAGE_KEY = "current_stock_data";

  // Load stored stock data from AsyncStorage
  const loadStoredStockData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STOCK_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error("Error loading stored stock data:", error);
      return {};
    }
  };

  // Save stock data to AsyncStorage
  const saveStockData = async (productId, quantity) => {
    try {
      const existingData = await loadStoredStockData();
      const updatedData = {
        ...existingData,
        [productId]: quantity,
      };
      await AsyncStorage.setItem(
        STOCK_STORAGE_KEY,
        JSON.stringify(updatedData)
      );
    } catch (error) {
      console.error("Error saving stock data:", error);
    }
  };

  // Clear specific product from AsyncStorage
  const clearProductStock = async (productId) => {
    try {
      const existingData = await loadStoredStockData();
      delete existingData[productId];
      await AsyncStorage.setItem(
        STOCK_STORAGE_KEY,
        JSON.stringify(existingData)
      );
    } catch (error) {
      console.error("Error clearing product stock:", error);
    }
  };

  // Clear all stored stock data (optional - for reset functionality)
  const clearAllStoredStock = async () => {
    try {
      await AsyncStorage.removeItem(STOCK_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing all stock data:", error);
    }
  };

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiGet("/picker/get_product_qty");

      if (response.statusOk && response.payload) {
        // Load stored stock data
        const storedStockData = await loadStoredStockData();

        // Transform API data to table format
        // const transformedData = response.payload.map((item) => ({
        //   id: item.id,
        //   product_id: item.product_id,
        //   product_name: item.product_name,
        //   // Use stored quantity if available, otherwise use 0
        //   current_stock:
        //     storedStockData[item.product_id] !== undefined
        //       ? storedStockData[item.product_id]
        //       : 0,
        //   actual_field: item.show_actual_qty ? item.available_qty : null,
        //   balance: item.show_actual_qty
        //     ? item.on_hand_qty - item.available_qty
        //     : null,
        //   show_actual_qty: item.show_actual_qty,
        //   on_hand_qty: item.on_hand_qty,
        //   available_qty: item.available_qty,
        // }));

        // Transform API data to table format
        // const transformedData = response.payload.map((item) => {
        //   const savedQty =
        //     storedStockData[item.product_id] !== undefined
        //       ? storedStockData[item.product_id]
        //       : 0;

        //   return {
        //     id: item.id,
        //     product_id: item.product_id,
        //     product_name: item.product_name,
        //     current_stock: savedQty,
        //     actual_field: item.show_actual_qty ? item.available_qty : null,
        //     balance:
        //       item.show_actual_qty && item.available_qty != null
        //         ? savedQty - item.available_qty
        //         : null,
        //     show_actual_qty: item.show_actual_qty,
        //     on_hand_qty: item.on_hand_qty,
        //     available_qty: item.available_qty,
        //   };
        // });

        const transformedData = response.payload.map((item) => {
          const savedQty = storedStockData[item.id] !== undefined // Use item.id instead of product_id
            ? storedStockData[item.id]
            : 0;
        
          return {
            id: item.id,
            product_id: item.product_id,
            product_name: item.product_name,
            current_stock: savedQty,
            actual_field: item.show_actual_qty ? item.available_qty : null,
            balance: item.show_actual_qty && item.available_qty != null
              ? savedQty - item.available_qty
              : null,
            show_actual_qty: item.show_actual_qty,
            on_hand_qty: item.on_hand_qty,
            available_qty: item.available_qty,
            lot_id: item.lot_id,  // Include lot information
            lot_name: item.lot_name
          };
        });

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

  // const updateQuantity = async (productId, newQuantity) => {
  //   try {
  //     const result = await updateCurrentStock(productId, newQuantity);

  //     if (result.success) {
  //       console.log("Quantity updated successfully:", result.message);
  //       toast.show("Stock updated", {
  //         type: "Success",
  //       });

  //       // Save to AsyncStorage
  //       await saveStockData(productId, newQuantity);

  //       // Update local state
  //       setTableData((prevData) =>
  //         prevData.map((item) =>
  //           item.product_id === productId
  //             ? { ...item, current_stock: newQuantity }
  //             : item
  //         )
  //       );
  //     } else {
  //       console.error("Failed to update quantity:", result.message);
  //       toast.show(result.message, {
  //         type: "error",
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Error updating quantity:", err);
  //     setError("Failed to update quantity");
  //     toast.show("Failed to update quantity", {
  //       type: "error",
  //     });
  //   }
  // };

  const handleUpdate = async (productId, newQuantity) => {
    // Find the item being updated
    const itemToUpdate = tableData.find((item) => item.id === productId);

    // If item not found, do nothing
    if (!itemToUpdate) {
      return;
    }

    // Validate if current stock exceeds on-hand quantity
    if (newQuantity > itemToUpdate.on_hand_qty) {
      toast.show("Current stock cannot exceed on-hand quantity.", {
        type: "danger",
      });
      return; // Stop execution
    }

    // Update local state with recalculated balance
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === productId
          ? {
              ...item,
              current_stock: newQuantity,
              balance:
                item.show_actual_qty && item.actual_field != null
                  ? newQuantity - item.actual_field
                  : null,
            }
          : item
      )
    );

    try {
      const result = await updateCurrentStock(productId, newQuantity);

      if (result.success) {
        toast.show("Stock updated", { type: "success" });
        await saveStockData(productId, newQuantity);
      } else {
        toast.show(result.message, { type: "danger" });
        fetchStockData();
      }
    } catch (err) {
      toast.show("Failed to update quantity", { type: "danger" });
      fetchStockData();
      console.error("Error updating quantity:", err);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    handleUpdate(productId, newQuantity);
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
        <StockTable tableData={tableData} onUpdateQuantity={updateQuantity} />
      )}
    </View>
  );
};

export default StockCountView;
