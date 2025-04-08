import { View, ScrollView, BackHandler, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { usePickersTabData, usecheckersTabData } from "../constants/tabData";
import TabItem from "./tabs/TabItem";
import { DetailScreen, CheckerDetailScreen } from "../screens";
import Header from "./Header";

const Tabs = ({ navigation }) => {
  const scrollRef = useRef(null);
  const route = useRoute();
  const userType = route?.params?.userType;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeName, setActiveName] = useState("Sales Invoice");
  const [tabHistory, setTabHistory] = useState([]);
  const [tabNameHistory, setTabNameHistory] = useState([]);
  const [productLines, setProductLines] = useState([]);

  const tabData =
    userType === "picker" || userType === "administrator"
      ? usePickersTabData()
      : usecheckersTabData();

  const ActiveComponent = tabData[activeIndex]?.component; // Store the active component

  const handleTabPress = (index, name, item) => {
    if (index !== activeIndex || name !== activeName) {
      setTabHistory((prevHistory) => [...prevHistory, activeIndex]); // Store previous tab
      setTabNameHistory((prevHistory) => [...prevHistory, activeName]); // Store previous tab
      setActiveIndex(index);
      setActiveName(name);
      setProductLines(item);
      // Automatically scroll to active tab
      if (index <= 4) {
        scrollRef.current?.scrollTo({
          x: index * 100, // Adjust based on your tab width
          animated: true,
        });
      }
    }
  };

  useEffect(() => {
    const backAction = () => {
      let newTabHistory = [...tabHistory];
      let newTabNameHistory = [...tabNameHistory];

      while (
        newTabHistory.length > 0 &&
        newTabHistory[newTabHistory.length - 1] > 4
      ) {
        newTabHistory.pop(); // Remove invalid tab index
        newTabNameHistory.pop(); // Remove corresponding tab name
      }

      if (newTabHistory.length > 0) {
        const previousTab = newTabHistory.pop(); // Get last valid tab index
        const previousNameTab = newTabNameHistory.pop(); // Get last valid tab name

        setTabHistory(newTabHistory);
        setTabNameHistory(newTabNameHistory);
        setActiveIndex(previousTab);
        setActiveName(previousNameTab);

        // Ensure the tab bar scrolls to the previous tab
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            x: previousTab * 100, // Adjust based on your tab width
            animated: true,
          });
        }, 100);

        return true; // Prevent default back action
      }

      return false; // Exit the app if no history is present
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [tabHistory, tabNameHistory]);

  console.log("activeIndex---->", activeIndex)

  return (
    <View className="flex-1 bg-[#F1F1F1]">
      <Header />
      {/* Scrollable Tab Bar */}
      <View className="border-b border-gray-300">
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          className="flex-none"
        >
          {tabData.map((item, index) => (
            <TabItem
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
              onPress={handleTabPress}
              activeName={activeName}
            />
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View className="flex-1 p-4">
        {ActiveComponent ? (
          <ActiveComponent navigation={navigation} onPress={handleTabPress} />
        ) : activeIndex === 6 ? (
          <CheckerDetailScreen activeName={activeName} productLines={productLines}/>
        ) : (
          <DetailScreen activeName={activeName} productLines={productLines} />
        )}
      </View>
    </View>
  );
};

export default Tabs;
