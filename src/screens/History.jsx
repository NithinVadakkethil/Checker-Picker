import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
// import Menu from "../assets/icons/menu.svg"

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

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-semibold">History</Text>
          <TouchableOpacity 
            className="w-12 h-12 bg-white rounded-full items-center justify-center"
            onPress={() => console.log('Menu pressed')}
          >
            {/* <Menu size={24} /> */}
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
    </SafeAreaView>
  );
};

export default History;