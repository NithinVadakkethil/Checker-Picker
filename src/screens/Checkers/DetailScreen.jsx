import React, { useRef, useState } from "react";
import { View, FlatList } from "react-native";
import {
  ProductDetails,
  ReassignBottomSheet,
  CreateBottomSheet,
} from "../../components";
import Add from "../../assets/icons/Add.svg";
import { checkerReAssign, checkerVerify } from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const DetailScreen = ({ activeName, productLines }) => {
  const toast = useToast();
  const reassignSheetRef = useRef(null);
  const createBottomSheetRef = useRef(null);
  const shownOrders = useRef(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errors, setErrors] = useState({
    qty: "",
    reason: "",
  });

  // Function to close the bottom sheet
  const editSheetClose = () => {
    setErrors({ qty: "", reason: "" });
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

  const reAssignTask = async (moveId, reason, qty) => {
    let valid = true;
    const newErrors = { qty: "", reason: "" };

    if (!qty || qty <= 0) {
      newErrors.qty = "Please enter a valid quantity.";
      valid = false;
    }

    if (!reason) {
      newErrors.reason = "Please enter a reason.";
      valid = false;
    }

    setErrors(newErrors);
    if (valid) {
      const result = await checkerReAssign(moveId, reason, qty);
      if (result?.success) {
        setGroupedProducts((prevGroups) =>
          prevGroups.map((group) =>
            group.map((product) =>
              product.move_id === moveId
                ? { ...product, state: "reassigned" }
                : product
            )
          )
        );
        editSheetClose();
        toast.show("Reassigned successfully", {
          type: "Success",
          // placement: "top",
        });
      } else {
        toast.show(result.message, {
          type: "error",
        });
      }
    }
  };

  const updateProductStatus = async (saleId) => {
    const result = await checkerVerify(saleId);
    toast.hideAll();
    if (result?.success) {
      setGroupedProducts((prevGroups) =>
        prevGroups.map((group) =>
          group.map((product) =>
            product.move_id === saleId ? { ...product, state: "done" } : product
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

  console.log("reassignSheetRef", reassignSheetRef?.current)

  return (
    <View className="flex-1 relative">
      <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`}
        renderItem={({ item }) => (
          <View className="p-4 bg-white rounded-sm overflow-hidden">
            {item.map((product, idx) => {
              const shouldShowOrderNo = !shownOrders.current.has(
                product.order_no
              );
              if (shouldShowOrderNo) {
                shownOrders.current.add(product.order_no);
              }

              return (
                <ProductDetails
                  key={product.move_id}
                  orderNo={shouldShowOrderNo ? product.order_no : null}
                  productName={product.product_name
                    ?.replace(/["\t]/g, "")
                    .trim()}
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
        errors={errors}
        setErrors={setErrors}
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
