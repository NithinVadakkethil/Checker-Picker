import React, { useRef } from "react";
import {
  FlatList,
  View,
  TextInput,
  Text,
  Keyboard,
} from "react-native";

const TableComponent = ({
  tableHead,
  tableData,
  onUpdateQuantity,
  showActualQty,
}) => {
  const flatListRef = useRef(null);

  const handleQuantitySubmit = (productId, value, index) => {
    const numericValue = parseFloat(value) || 0;
    onUpdateQuantity(productId, numericValue);
    Keyboard.dismiss();
  };

  const handleFocus = (index) => {
    // Scroll to center the focused item
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5, // Center the item
      });
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      key={index}
      className="flex-row h-10 items-center border-b border-gray-300 px-2"
    >
      {/* Product Name */}
      <Text
        className={`text-left text-sm text-black ${
          showActualQty ? "flex-[2]" : "flex-[3]"
        }`}
        // numberOfLines={1}
        // ellipsizeMode="tail"
      >
        {item.product_name}, {item.lot_name}
      </Text>

      {/* Current Stock - Editable */}
      <View className="flex-[1]">
        <TextInput
          className="flex-[1] text-sm text-black text-center pb-2 rounded mx-1"
          keyboardType="numeric"
          defaultValue={item.current_stock.toString()}
          placeholder="0"
          onFocus={() => handleFocus(index)}
          onSubmitEditing={(e) =>
            handleQuantitySubmit(item.id, e.nativeEvent.text, index)
          }
          returnKeyType="done"
          selectTextOnFocus={true}
        />
      </View>

      {/* Actual Field - Only show if showActualQty is true */}
      {showActualQty && (
        <Text className="flex-[1] text-center text-sm text-black">
          {item.show_actual_qty ? item.actual_field || 0 : "-"}
        </Text>
      )}

      {/* Balance - Only show if showActualQty is true */}
      {showActualQty && (
        <Text className="flex-[1] text-center text-sm text-black">
          {item.show_actual_qty ? item.balance || 0 : "-"}
        </Text>
      )}
    </View>
  );

  return (
    <View className="flex-1">
      {/* Table Header */}
      <View className="bg-gray-100 px-2 py-2 border-b border-gray-300">
        <View className="flex-row">
          <Text
            className={`text-left font-semibold text-black text-sm ${
              showActualQty ? "flex-[2]" : "flex-[3]"
            }`}
          >
            {tableHead[0]}
          </Text>
          <Text className="flex-[1] text-center font-semibold text-black text-sm">
            {tableHead[1]}
          </Text>
          {showActualQty && (
            <>
              <Text className="flex-[1] text-center font-semibold text-black text-sm">
                {tableHead[2]}
              </Text>
              <Text className="flex-[1] text-center font-semibold text-black text-sm">
                {tableHead[3]}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Table Body */}
      <FlatList
        removeClippedSubviews={false}
        ref={flatListRef}
        data={tableData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.product_id}_${item.id}_${index}`}
      />
    </View>
  );
};

export default TableComponent;
