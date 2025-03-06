import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const TabItem = ({ item, index, activeIndex, onPress, activeName }) => {
  const isActive = activeIndex === index || activeName === item.name

  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      className="px-2 pt-6"
      style={{ minWidth: 100 }} // Adjust width for spacing
    >
      <View className="items-center">
        <Text
          className={`text-nowrap ${
            isActive ? "font-inter-light text-[16px] text-[#000]" : "text-[16px] text-[#000] opacity-50"
          }`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        {/* Active Underline */}
        <View
          className={`h-0.5 w-full rounded-full ${
            isActive ? "bg-[#004CAB] mt-2" : "bg-transparent"
          }`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;
