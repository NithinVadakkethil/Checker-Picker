import { View, Text, Button } from 'react-native';
import React from 'react';

const ZoneTransfer = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Zone Transfer Screen</Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate('Detail', { screenName: 'Zone Transfer' })} />
    </View>
  );
};

export default ZoneTransfer;
