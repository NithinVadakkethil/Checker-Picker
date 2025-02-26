import { View, Text, Button } from 'react-native';
import React from 'react';

const SalesInvoice = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Sales Invoice Screen</Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate('Detail', { screenName: 'Sales Invoice' })} />
    </View>
  );
};

export default SalesInvoice;
