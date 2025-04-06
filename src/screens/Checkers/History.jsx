import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGet } from '../../utils/apiService';
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

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformPayload = (orders) => {
    if (!Array.isArray(orders)) return [];

    return orders.flatMap(order =>
      order.product_lines?.map(product => ({
        id: order.id,
        move_id: product.move_id,
        product_id: product.product_id,
        product_name: product.product_name.trim(),
        expiry_date: product.expiry_date || "",
        qty: product.qty,
        uom_name: product.uom_name,
        uom_id: product.uom_id,
        state: product.state,
        reassign_reason: product.reassign_reason,
        lot_id: product.lot_id || "",
        lot_name: product.lot_name || "",
        on_hand_qty: product.on_hand_qty,
        order_no: order.order_no, // Key for grouping
        location_id: order.location_id,
        location_name: order.location_name,
        location_dest_id: order.location_dest_id,
        location_dest_name: order.location_dest_name,
      }))
    );
  };

  const groupByOrderNo = (data) => {
    const grouped = data?.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = [];
      }
      acc[item.order_no].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map(order_no => ({
      order_no,
      items: grouped[order_no], // All details for this order_no
      state: grouped[order_no][0].state, // Take state from first item
    }));
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiGet("/picker/history");
        if (response?.payload) {
          const transformedPayload = transformPayload(response.payload);
          const groupedData = groupByOrderNo(transformedPayload);
          setHistory(groupedData);
        } else {
          setHistory([]);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Clear token
      navigation.replace("Login")
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  console.log("history--->", history)

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