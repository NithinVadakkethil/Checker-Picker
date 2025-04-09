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
      toast.hideAll();
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

  const displayedOrderNos = new Set();

  console.log("chekkersproductlines", productLines);

  return (
    <View className="flex-1 relative">
      <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`}
        renderItem={({ item }) => (
          <View className="p-4 bg-white rounded-sm overflow-hidden">
            <FlatList
              data={item} // Iterate over products in the group
              keyExtractor={(product) => `product-${product.move_id}`}
              renderItem={({ item: product }) => {
                // Only show order_no if it hasn't been displayed yet
                const showOrderNo = !displayedOrderNos.has(product.order_no);
                if (showOrderNo) {
                  displayedOrderNos.add(product.order_no);
                }

                return (
                  <ProductDetails
                    key={`product-${product.move_id}`}
                    orderNo={showOrderNo ? product.order_no : null} // Show only once
                    moveId={product.move_id}
                    productName={product.product_name
                      .replace(/["\t]/g, "")
                      .trim()}
                    availableQty={product.on_hand_qty}
                    expiryDate={product.expiry_date}
                    fromZone={product.location_name}
                    toZone={product.location_dest_name}
                    fromColor="purple"
                    toColor="red"
                    uom={product.uom_name}
                    qty={product.qty}
                    status={
                      (product.state === "picker_pending" || product.state === "reassigned") ? "Pending" : "Done"
                    }
                    onPress={editSheetOpen}
                    onStatusChange={updateProductStatus}
                  />
                );
              }}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      {/* <TouchableOpacity
        onPress={createSheetOpen}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity> */}
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
