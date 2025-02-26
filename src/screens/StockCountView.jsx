import { View, Text, Button } from 'react-native';
import React from 'react';

const StockCountView = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Stock Count View Screen</Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate('Detail', { screenName: 'Stock Count View' })} />
    </View>
  );
};

export default StockCountView;
