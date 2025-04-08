import React, { useRef, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ProductDetails, ReassignBottomSheet, CreateBottomSheet } from "../../components";
import Add from "../../assets/icons/Add.svg"
import { checkerReAssign } from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const DetailScreen = ({ activeName, productLines }) => {
  const toast = useToast();
  // Create a reference to the bottom sheet
  const reassignSheetRef = useRef(null);
  const createBottomSheetRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to close the bottom sheet
  const editSheetClose = () => {
    reassignSheetRef.current.close();
  };

  const reassignSheetOpen = () => {
    reassignSheetRef.current.open();
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

  const reAssignTask = async (moveId, reason) => {
    const result = await checkerReAssign(moveId, reason);
    if (result?.success) {
      toast.show("Reassigned successfully", {
        type: "Success",
        // placement: "top",
      });
    }else {
      toast.show(result.message, {
        type: "error",
      });
    }
  }

  const updateProductStatus = async (orderNo) => {
    const result = await checkerReAssign(orderNo, "Add 3 products");
    toast.hideAll()
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

  console.log("productLines--->", productLines)

  const shownOrders = useRef(new Set());


  return (
    <View className="flex-1 relative">
      {/* <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`} // Ensure key is a string
        // renderItem={({ item, index }) => (
        //   <View className="p-4 bg-white rounded-sm overflow-hidden">
        //     <ProductDetails
        //       index={index} // Pass index to ProductDetails
        //       orderNo={index === 0 ? item[0].order_no : null}
        //       moveId={item[0].move_id}
        //       productName={item[0]?.product_name?.replace(/["\t]/g, "").trim()}
        //       availableQty={item[0].on_hand_qty}
        //       expiryDate={item[0].expiry_date}
        //       fromZone={item[0].location_name}
        //       toZone={item[0].location_dest_name}
        //       fromColor="purple" // Adjust color dynamically if needed
        //       toColor="red"
        //       uom={item[0].uom_name}
        //       pickerName={item[0].picker_name}
        //       qty={item[0].qty} // Sum quantity for grouped products
        //       status={item[0].state === "picker_done" ? "Pending" : item[0].state === "reassigned" ? "Reassigned" : "Done"}
        //       onPress={() => {
        //         setSelectedProduct({
        //           fromZone: item[0].location_name,
        //           toZone: item[0].location_dest_name,
        //           pickerName: item[0].picker_name,
        //           qty: item[0]?.qty?.toString(),
        //           moveId: item[0].move_id,
        //           batchNo: item[0].lot_name, // Assuming `lot_name` is the batch number
        //         });
        //         reassignSheetOpen(); // Open BottomSheet
        //       }}
        //       onStatusChange={updateProductStatus} // Pass function
        //       type={"Checker"}
        //     />
        //   </View>
        // )}
        renderItem={({ item, index }) => (
          <View className="p-4 bg-white rounded-sm overflow-hidden">
            {item.map((product, idx) => (
              <ProductDetails
                key={product.move_id}
                index={idx}
                orderNo={idx === 0 ? product.order_no : null}
                moveId={product.move_id}
                productName={product?.product_name?.replace(/["\t]/g, "").trim()}
                availableQty={product.on_hand_qty}
                expiryDate={product.expiry_date}
                fromZone={product.location_name}
                toZone={product.location_dest_name}
                fromColor="purple"
                toColor="red"
                uom={product.uom_name}
                pickerName={product.picker_name}
                qty={product.qty}
                status={
                  product.state === "picker_done"
                    ? "Pending"
                    : product.state === "reassigned"
                    ? "Reassigned"
                    : "Done"
                }
                onPress={() => {
                  setSelectedProduct({
                    fromZone: product.location_name,
                    toZone: product.location_dest_name,
                    pickerName: product.picker_name,
                    qty: product?.qty?.toString(),
                    moveId: product.move_id,
                    batchNo: product.lot_name,
                  });
                  reassignSheetOpen();
                }}
                onStatusChange={updateProductStatus}
                type={"Checker"}
              />
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      /> */}
      <FlatList
  data={groupedProducts}
  keyExtractor={(item, index) => `group-${index}`}
  renderItem={({ item }) => (
    <View className="p-4 bg-white rounded-sm overflow-hidden">
      {item.map((product, idx) => {
        const shouldShowOrderNo = !shownOrders.current.has(product.order_no);
        if (shouldShowOrderNo) {
          shownOrders.current.add(product.order_no);
        }

        return (
          <ProductDetails
            key={product.move_id}
            orderNo={shouldShowOrderNo ? product.order_no : null}
            productName={product.product_name?.replace(/["\t]/g, "").trim()}
            availableQty={product.on_hand_qty}
            expiryDate={product.expiry_date}
            fromZone={product.location_name}
            toZone={product.location_dest_name}
            fromColor="purple"
            toColor="red"
            uom={product.uom_name}
            pickerName={product.picker_name}
            qty={product.qty}
            status={
              product.state === "picker_done"
                ? "Pending"
                : product.state === "reassigned"
                ? "Reassigned"
                : "Done"
            }
            onPress={() => {
              setSelectedProduct({
                fromZone: product.location_name,
                toZone: product.location_dest_name,
                pickerName: product.picker_name,
                qty: product.qty?.toString(),
                moveId: product.move_id,
                batchNo: product.lot_name,
              });
              reassignSheetOpen();
            }}
            onStatusChange={updateProductStatus}
            type={"Checker"}
          />
        );
      })}
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
      <ReassignBottomSheet
        onClose={editSheetClose}
        onOpen={reassignSheetOpen}
        bottomSheetRef={reassignSheetRef}
        selectedProduct={selectedProduct}
        reAssignTask={reAssignTask}
        setSelectedProduct={setSelectedProduct}
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
