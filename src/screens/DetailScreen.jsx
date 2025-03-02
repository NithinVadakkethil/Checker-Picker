import React from "react";
import { View, FlatList } from "react-native";
import { Card } from "../components";

const DetailScreen = () => {
  // Sample data for demonstration
  const orders = [
    {
      id: 1,
      orderNo: "1234567",
      productName: "Dairy Milk",
      availableQty: 1500,
      expiryDate: "12/12/25",
      status: "Done",
      uom: "50 Unit",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ecccd287-25d4-403c-9e0b-ce302ae1d759?placeholderIfAbsent=true&apiKey=05f15ed087014a6a9f74a6d6a78953d9",
      fromZone: "Zone A",
      toArea: "Packing Delivery Area",
      qty: 100,
      hasLocationInfo: true,
    },
    {
      id: 2,
      orderNo: "1234567",
      productName: "Dairy Milk",
      availableQty: 1500,
      expiryDate: "12/12/25",
      status: "Done",
      uom: "50 Unit",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/32230cf2-f06c-4d21-881a-20bd06349fc5?placeholderIfAbsent=true&apiKey=05f15ed087014a6a9f74a6d6a78953d9",
      hasLocationInfo: false,
    },
  ];

  return (
    <View className="flex-1">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card order={item} />
        )}
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default DetailScreen;
