import { View, ScrollView, BackHandler } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import TabItem from "./tabs/TabItem";

const Tabs = ({ data, navigation }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabHistory, setTabHistory] = useState([]);

  const ActiveComponent = data[activeIndex]?.component; // Store the active component

  const handleTabPress = (index) => {
    if (index !== activeIndex) {
      setTabHistory((prevHistory) => [...prevHistory, activeIndex]); // Store previous tab
      setActiveIndex(index);

      // Automatically scroll to active tab
      scrollRef.current?.scrollTo({
        x: index * 100, // Adjust based on your tab width
        animated: true,
      });
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (tabHistory.length > 0) {
        const previousTab = tabHistory[tabHistory.length - 1]; // Get last visited tab
        setTabHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove last entry
        setActiveIndex(previousTab); // Go back to previous tab

        // Ensure the tab bar scrolls to the previous tab
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            x: previousTab * 100, // Adjust based on your tab width
            animated: true,
          });
        }, 100); // Delay to allow state update before scrolling

        return true; // Prevent default back action
      }
      return false; // Exit the app if no history is present
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [tabHistory]);

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
        {ActiveComponent ? (
          <ActiveComponent navigation={navigation} />
        ) : (
          <Text>No content available</Text>
        )}
      </View>
    </View>
  );
};

export default Tabs;
