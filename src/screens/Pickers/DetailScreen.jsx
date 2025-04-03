import React, { useState, useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  ProductDetails,
  EditBottomSheet,
  CreateBottomSheet,
} from "../../components";
import Add from "../../assets/icons/Add.svg";
import { updatePickerStatus } from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const DetailScreen = ({ activeName, productLines }) => {
  const toast = useToast();
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

  const [groupedProducts, setGroupedProducts] = useState(() => {
    return Object.values(
      productLines?.reduce((acc, product) => {
        const key = `${product.location_name}-${product.location_dest_name}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(product);
        return acc;
      }, {})
    );
  });

  // Function to update the status of a product
  const updateProductStatus = async (orderNo) => {
    const result = await updatePickerStatus(orderNo);
    if (result?.success) {
      setGroupedProducts((prevGroups) =>
        prevGroups.map((group) =>
          group.map((product) =>
            product.move_id === orderNo
              ? { ...product, state: "done" }
              : product
          )
        )
      );
      toast.show("Status updated successfully", {
        type: "Success",
        // placement: "top",
      });
    } else {
      toast.show(result.message, {
        type: "error",
      });
    }
  };

  return (
    <View className="flex-1 relative">
      <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`} // Ensure key is a string
        renderItem={({ item, index }) => (
          <View className="p-4 bg-white rounded-sm overflow-hidden">
            <ProductDetails
              index={index} // Pass index to ProductDetails
              orderNo={item[0].order_no}
              moveId={item[0].move_id}
              productName={item[0]?.product_name?.replace(/["\t]/g, "").trim()}
              availableQty={item[0].on_hand_qty}
              expiryDate={item[0].expiry_date}
              fromZone={item[0].location_name}
              toZone={item[0].location_dest_name}
              fromColor="purple" // Adjust color dynamically if needed
              toColor="red"
              uom={item[0].uom_name}
              qty={item.reduce((sum, product) => sum + product.qty, 0)} // Sum quantity for grouped products
              status={item[0].state === "picker_pending" ? "Pending" : "Done"}
              onPress={editSheetOpen}
              onStatusChange={updateProductStatus} // Pass function
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
