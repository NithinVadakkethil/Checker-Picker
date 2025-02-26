import { View, Text } from 'react-native';
import React from 'react';

const DetailScreen = ({ route }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Detail Screen</Text>
      <Text className="text-gray-500">You navigated from: {route.params?.screenName}</Text>
    </View>
  );
};

export default DetailScreen;
