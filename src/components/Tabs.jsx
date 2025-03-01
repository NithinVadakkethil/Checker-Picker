import { View, ScrollView } from "react-native";
import React, { useState, useRef } from "react";
import TabItem from "./tabs/TabItem";

const Tabs = ({ data, navigation }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveComponent = data[activeIndex]?.component; // Store the active component

  const handleTabPress = (index) => {
    setActiveIndex(index);

    // Automatically scroll to active tab
    scrollRef.current?.scrollTo({
      x: index * 100, // Adjust based on your tab width
      animated: true,
    });
  };

  return (
    <View className="flex-1 bg-[#F1F1F1]">
      {/* Scrollable Tab Bar */}
      <View className="border-b border-gray-300">
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="flex-none"
      >
        {data.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            index={index}
            activeIndex={activeIndex}
            onPress={handleTabPress}
          />
        ))}
      </ScrollView>
      </View>

      {/* Tab Content */}
      <View className="flex-1 p-4">
      {ActiveComponent ? <ActiveComponent navigation={navigation} /> : <Text>No content available</Text>}
      </View>
    </View>
  );
};

export default Tabs;
