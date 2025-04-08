import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const TabItem = ({ item, index, activeIndex, onPress, activeName }) => {
  const isActive = activeIndex === index || activeName === item.name;

  return (
    <TouchableOpacity
      onPress={() => onPress(index, item.name)}
      className="px-2 pt-6"
      style={{ minWidth: 50 }}
    >
      <View className="items-center">
        <View className="relative">
          <Text
            className={`text-nowrap ${
              isActive
                ? "font-inter-light text-[14px] text-[#000]"
                : "text-[14px] text-[#000] opacity-50"
            }`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>

          {item.count > 0 && (
            <View className={`absolute ${item.count > 9 ? '-top-2 px-0.5' : '-top-1.5 px-1'} -right-3 bg-red-500 rounded-full py-0 items-center justify-center`}>
              <Text className="text-white text-[10px] font-bold">
                {item.count}
              </Text>
            </View>
          )}
        </View>

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

