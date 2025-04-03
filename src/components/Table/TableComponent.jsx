import React, { useState, useEffect } from "react";
import { FlatList, View, TextInput, Text } from "react-native";

const TableComponent = ({ tableHead, tableData }) => {
  const [stockValues, setStockValues] = useState([]);

  // Update stockValues when tableData is received
  useEffect(() => {
    if (tableData?.length > 0) {
      setStockValues(tableData.map((row) => row[1]?.toString() || "")); // Ensure values are strings
    }
  }, [tableData]);

  const handleStockChange = (text, index) => {
    const updatedStock = [...stockValues];
    updatedStock[index] = text;
    setStockValues(updatedStock);
  };

  console.log("stockValues --->", stockValues);

  const renderItem = ({ item, index }) => (
    <View
      key={index}
      className="flex-row h-10 items-center border-b border-gray-300 px-2"
    >
      {/* Product Name */}
      <Text className="flex-[2] text-left text-sm text-black">{item[0]}</Text>

      {/* Current Stock - Editable with Proper Alignment */}
      <View className="flex-[1]">
        <TextInput
          className="flex-[1] text-sm text-black text-center pb-2"
          value={stockValues[index] || ""}
          onChangeText={(text) => handleStockChange(text, index)}
          keyboardType="numeric"
        />
      </View>

      {/* Actual Field */}
      <Text className="flex-[1] text-center text-sm text-black">{item[2]}</Text>

      {/* Balance */}
      <Text className="flex-[1] text-center text-sm text-black">{item[3]}</Text>
    </View>
  );

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
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={50} // Load initial 50 rows
        maxToRenderPerBatch={20} // Load 20 more at a time
        windowSize={5} // Keep a few screens in memory
      />
    </View>
  );
};

export default TableComponent;