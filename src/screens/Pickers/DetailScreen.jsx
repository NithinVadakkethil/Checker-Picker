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

  console.log("groupedProducts---->", groupedProducts)

  return (
    <View className="flex-1 relative">
      <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`} // Ensure key is a string
        renderItem={({ item }) => (
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
              status={item[0].state === "picker_pending" ? "Pending" : "Done"}
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
