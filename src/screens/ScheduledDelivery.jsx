import { View, Text, Button } from 'react-native';
import React from 'react';

const ScheduledDelivery = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Scheduled Delivery Screen</Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate('Detail', { screenName: 'Scheduled Delivery' })} />
    </View>
  );
};

export default ScheduledDelivery;
