import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from "../../assets/icons/menu.svg"

const HistoryItem = ({ initials, text, time }) => (
  <View className="flex-row items-center p-4 bg-white rounded-lg mb-3">
    <View className="w-12 h-12 rounded-full bg-[#F1F1F1] mr-4 items-center justify-center">
      <Text className="text-[#0E0C0C] text-lg font-medium">{initials}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-base font-normal mb-1">{text}</Text>
      <Text className="text-[#8B8586] text-sm">{time}</Text>
    </View>
  </View>
);

const History = () => {
  const navigation = useNavigation()
  const historyData = [
    { id: '1', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '2', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '3', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '4', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '5', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '6', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '7', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
    { id: '8', text: 'Lorem ipsum dolor sit amet consectetur', time: '5min ago', initials: 'LI' },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Clear token
      navigation.replace("Login")
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View className="flex-1">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-2xl font-semibold">History</Text>
          <TouchableOpacity 
            className="p-2.5 bg-white rounded-xl items-center justify-center"
            onPress={ handleLogout}
          >
            <Menu size={24} />
          </TouchableOpacity>
        </View>
        
        <Text className="text-xl font-semibold mb-4">Last 7 days</Text>
        
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {historyData.map((item) => (
            <HistoryItem 
              key={item.id}
              initials={item.initials}
              text={item.text}
              time={item.time}
            />
          ))}
          <View className="h-4" />
        </ScrollView>
      </View>
  );
};

export default History;