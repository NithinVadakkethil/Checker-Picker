import { View } from 'react-native';
import React, { useState } from 'react';
import TabItem from './tabs/TabItem';

const Tabs = ({ data, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveComponent = data[activeIndex]?.component; // Store the active component

  return (
    <View className="flex-1">
      {/* Tab Bar */}
      <View className="flex-row items-center justify-between gap-4 p-4 bg-gray-100">
        {data.map((item, index) => (
          <TabItem key={index} item={item} index={index} activeIndex={activeIndex} onPress={setActiveIndex} />
        ))}
      </View>

      {/* Tab Content */}
      <View className="flex-1 p-4">
      {ActiveComponent ? <ActiveComponent navigation={navigation} /> : <Text>No content available</Text>}
      </View>
    </View>
  );
};

export default Tabs;
