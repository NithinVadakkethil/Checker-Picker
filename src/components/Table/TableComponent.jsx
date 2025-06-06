import React, { useState, useEffect } from "react";
import { FlatList, View, TextInput, Text } from "react-native";
import { updateCurrentStock } from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const TableComponent = ({
  tableHead,
  tableData,
  fetchInvoices,
  saveStockToStorage,
}) => {
  const toast = useToast();
  // Use object with product ID as key instead of array with index
  const [stockValues, setStockValues] = useState({});
  const [loadingItems, setLoadingItems] = useState(new Set());

  // Update stockValues when tableData is received
  useEffect(() => {
    if (tableData?.length > 0) {
      const stockObj = {};
      tableData.forEach((row) => {
        const productId = row[4]; // product ID
        const currentStock = row[1]; // current stock
        // Only set if we don't already have a value for this product
        if (!(productId in stockValues)) {
          stockObj[productId] = currentStock;
        }
      });
      
      // Merge with existing values to preserve user inputs
      setStockValues(prev => ({ ...prev, ...stockObj }));
    }
  }, [tableData]);

  const handleStockChange = (text, productId) => {
    setStockValues(prev => ({
      ...prev,
      [productId]: text
    }));
  };

  const updateProductStock = async (productId, quantity) => {
    // Validate inputs
    if (!productId || quantity === undefined || quantity === null || quantity === '') {
      toast.show("Invalid product ID or quantity", { type: "error" });
      return;
    }

    try {
      setLoadingItems(prev => new Set([...prev, productId]));
      console.log('Updating stock:', { productId, quantity });
      
      const result = await updateCurrentStock(productId, quantity);
      console.log('Update result:', result);
      
      if (result?.success) {
        await saveStockToStorage(productId, quantity);
        toast.show("Stock updated", {
          type: "Success", // Changed from "Success" to "success"
        });
        // Add a small delay before fetching to ensure state is stable
        setTimeout(() => {
          fetchInvoices();
        }, 100);
      } else {
        const errorMessage = result?.message || "Update failed";
        toast.show(errorMessage, {
          type: "error",
        });
      }
    } catch (error) {
      console.error("Update stock error:", error);
      const errorMessage = error?.message || "Something went wrong";
      toast.show(errorMessage, { type: "error" });
    } finally {
      // Ensure loading state is cleared even if component unmounts
      setTimeout(() => {
        setLoadingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 50);
    }
  };

  const renderItem = ({ item, index }) => {
    const productId = item[4];
    const isLoading = loadingItems.has(productId);
    
    // Validate item data
    if (!item || !productId) {
      return null;
    }
    
    return (
      <View
        key={`item-${productId}`} // More specific key
        className="flex-row h-10 items-center border-b border-gray-300 px-2"
      >
        {/* Product Name */}
        <Text className="flex-[2] text-left text-sm text-black">
          {item[0] || ''}
        </Text>

        {/* Current Stock - Editable with Proper Alignment */}
        <View className="flex-[1] justify-center items-center">
          {isLoading ? (
            <Text className="text-xs text-gray-500">Updating...</Text>
          ) : (
            <TextInput
              className="flex-[1] text-sm text-black text-center pb-2"
              value={stockValues[productId]?.toString() || ""}
              onChangeText={(text) => handleStockChange(text, productId)}
              keyboardType="numeric"
              editable={!isLoading}
              onSubmitEditing={() => {
                const currentValue = stockValues[productId];
                if (currentValue !== undefined && currentValue !== null && currentValue !== '') {
                  updateProductStock(productId, currentValue);
                }
              }}
              returnKeyType="done"
              placeholder="0"
            />
          )}
        </View>

        {/* Actual Field */}
        <Text className="flex-[1] text-center text-sm text-black" numberOfLines={1}>
          {item[2] || ''}
        </Text>

        {/* Balance */}
        <Text className="flex-[1] text-center text-sm text-black" numberOfLines={1}>
          {item[3] || ''}
        </Text>
      </View>
    );
  };

  const getItemLayout = (data, index) => ({
    length: 50, // Increased height to accommodate multi-line text
    offset: 50 * index,
    index,
  });

  return (
    <View className="flex-1">
      {/* Table Header */}
      <View className="bg-gray-100 px-2 py-2 border-b border-gray-300">
        <View className="flex-row">
          <Text className="flex-[2] text-left font-semibold text-black text-sm">
            {tableHead[0]}
          </Text>
          <Text className="flex-[1] text-center font-semibold text-black text-sm">
            {tableHead[1]}
          </Text>
          <Text className="flex-[1] text-center font-semibold text-black text-sm">
            {tableHead[2]}
          </Text>
          <Text className="flex-[1] text-center font-semibold text-black text-sm">
            {tableHead[3]}
          </Text>
        </View>
      </View>

      {/* Table Body */}
      <FlatList
        data={tableData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item[4] ? `product-${item[4]}` : `index-${index}`} // Safer key extraction
        getItemLayout={getItemLayout}
        initialNumToRender={15} // Reduce further
        maxToRenderPerBatch={8} // Smaller batches
        windowSize={8} // Smaller window
        removeClippedSubviews={true}
        // Remove maintainVisibleContentPosition as it might cause issues
        // Add these for better error handling
        onScrollToIndexFailed={(info) => {
          console.warn('Scroll to index failed:', info);
        }}
        // Disable layout animations to prevent rendering issues
        disableVirtualization={false}
      />
    </View>
  );
};

export default TableComponent;