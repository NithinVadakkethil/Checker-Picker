import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const TabItem = ({ item, index, activeIndex, onPress }) => {
  return (
    <TouchableOpacity key={index} onPress={() => onPress(index)} className="py-2">
      <View className="items-center">
        <Text className={activeIndex === index ? 'font-bold text-blue-600' : 'text-gray-500'}>
          {item.name}
        </Text>
        {activeIndex === index && (
          <View className="w-12 h-1 bg-blue-600 mt-1 rounded-full" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;
