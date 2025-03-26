import React, { useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  ProductDetails,
  EditBottomSheet,
  CreateBottomSheet,
} from "../../components";
import Add from "../../assets/icons/Add.svg";

const DetailScreen = ({ activeName, productLines }) => {
  // Create a reference to the bottom sheet
  const editBottomSheetRef = useRef(null);
  const createBottomSheetRef = useRef(null);

  // Function to close the bottom sheet
  const editSheetClose = () => {
    editBottomSheetRef.current.close();
  };

  const editSheetOpen = () => {
    editBottomSheetRef.current.open();
  };
  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };
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
      fromColor: "#2F80ED",
      toColor: "#EB5B00",
    },
  ];

  const groupedProducts = Object.values(
    productLines.reduce((acc, product) => {
      const key = `${product.location_name}-${product.location_dest_name}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    }, {})
  );

  console.log("productLines===>", productLines);

  return (
    <View className="flex-1 relative">
      <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`} // Ensure key is a string
        renderItem={({ item }) => (
          // <Card
          //   order={item}
          //   onPress={editSheetOpen}
          //   fromColor={item.fromColor}
          //   toColor={item.toColor}
          // />
          <View className="p-4 bg-white rounded-sm overflow-hidden">
            <ProductDetails
              orderNo={item[0].order_no}
              productName={item[0].product_name}
              availableQty={item[0].available_qty}
              expiryDate={item[0].expiry_date}
              fromZone={item[0].location_name}
              toZone={item[0].location_dest_name}
              fromColor="purple" // Adjust color dynamically if needed
              toColor="red"
              uom={item[0].uom_name}
              qty={item.reduce((sum, product) => sum + product.qty, 0)} // Sum quantity for grouped products
              status={item[0].status}
              onPress={editSheetOpen}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <TouchableOpacity
        onPress={createSheetOpen}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity>
      <EditBottomSheet
        onClose={editSheetClose}
        onOpen={editSheetOpen}
        bottomSheetRef={editBottomSheetRef}
      />
      <CreateBottomSheet
        onClose={createSheetClose}
        onOpen={createSheetOpen}
        bottomSheetRef={createBottomSheetRef}
      />
    </View>
  );
};

export default DetailScreen;
