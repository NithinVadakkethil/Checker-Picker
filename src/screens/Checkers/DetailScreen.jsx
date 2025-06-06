import React, { useRef, useState } from "react";
import { View, FlatList } from "react-native";
import {
  ProductDetails,
  ReassignBottomSheet,
  CreateBottomSheet,
  EditBottomSheet,
} from "../../components";
import Add from "../../assets/icons/Add.svg";
import {
  checkerReAssign,
  checkerVerify,
  updatecheckerDate,
  checkerSaleOrderVerify,
  checkerZoneTransferVerify,
} from "../../api/CommonService";
import { useToast } from "react-native-toast-notifications";

const DetailScreen = ({ activeName, productLines }) => {
  const toast = useToast();
  const editBottomSheetRef = useRef(null);
  const reassignSheetRef = useRef(null);
  const createBottomSheetRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [activeMoveId, setActiveMoveId] = useState(null);
  const [loadingMap, setLoadingMap] = useState({});
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderStaus, setOrderStaus] = useState(false);
  const [errors, setErrors] = useState({
    qty: "",
    reason: "",
  });

  const setLoadingForMoveId = (moveId, isLoading) => {
    setLoadingMap((prev) => ({
      ...prev,
      [moveId]: isLoading,
    }));
  };

  const editSheetClose = () => {
    editBottomSheetRef.current.close();
  };

  const editSheetOpen = (moveId) => {
    setActiveMoveId(moveId);
    editBottomSheetRef.current.open();
  };

  // Function to close the bottom sheet
  const reassignSheetClose = () => {
    setErrors({ qty: "", reason: "" });
    reassignSheetRef.current.close();
  };

  const reassignSheetOpen = () => {
    if (reassignSheetRef.current) {
      reassignSheetRef.current.close();
      setTimeout(() => {
        reassignSheetRef.current.open();
      }, 300); // gives time to unmount/settle before reopening
    }
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
      try {
        setLoading(true)
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
          reassignSheetClose();
          toast.show("Reassigned successfully", {
            type: "Success",
            // placement: "top",
          });
        } else {
          toast.show(result.message, {
            type: "error",
          });
        }
      } catch (error) {
        toast.show(error, {
          type: "error",
        });
      } finally {
        setLoading(false)
      }
    }
  };

  const updateProductStatus = async (moveId) => {
    try {
      setLoadingForMoveId(moveId, true);
      const result = await checkerVerify(moveId);
      toast.hideAll();
      if (result?.success) {
        setGroupedProducts((prevGroups) =>
          prevGroups.map((group) =>
            group.map((product) =>
              product.move_id === moveId
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
    } catch (error) {
      toast.show(error, {
        type: "error",
      });
    } finally {
      setLoadingForMoveId(moveId, false);
    }
  };

  const onOrderStatusChange = async (saleId) => {
    try {
      setLoadingForMoveId(saleId, true);
      const result =
        activeName === "Zone Transfer"
          ? await checkerZoneTransferVerify(saleId)
          : await checkerSaleOrderVerify(saleId);
      toast.hideAll();
      if (result?.success) {
        setOrderStaus(true);
        // setGroupedProducts((prevGroups) =>
        //   prevGroups.map((group) =>
        //     group.map((product) =>
        //       product.move_id === moveId ? { ...product, state: "done" } : product
        //     )
        //   )
        // );
        toast.show("Status updated successfully", {
          type: "Success",
          // placement: "top",
        });
      } else {
        toast.show(result.message, {
          type: "error",
        });
      }
    } catch (error) {
      toast.show(error, {
        type: "error",
      });
    } finally {
      setLoadingForMoveId(saleId, false);
    }
  };

  const handleOnPress = (product) => {
    if (activeName !== "Reciepts") {
      setSelectedProduct({
        fromZone: product.location_name,
        toZone: product.location_dest_name,
        pickerName: product.picker_name,
        qty: product.qty?.toString(),
        actualQty: product.qty?.toString(),
        moveId: product.move_id,
        batchNo: product.lot_name,
      });
      reassignSheetOpen();
    } else {
      editSheetOpen(product.move_id);
    }
  };

  const checkerDateUpdate = async (moveId, date) => {
    setLoadingForMoveId(moveId, true);
    try {
      const result = await updatecheckerDate(moveId, { date: date });
    if (result?.success) {
      setGroupedProducts((prevGroups) =>
        prevGroups.map((group) =>
          group.map((product) =>
            product.move_id === moveId ? { ...product, state: "done" } : product
          )
        )
      );
      editSheetClose();
      toast.hideAll();
      toast.show("Date updated successfully", {
        type: "Success",
        // placement: "top",
      });
    } else {
      toast.show(result.message, {
        type: "error",
      });
    }
    } catch (error) {
      toast.show(error, {
        type: "error",
      });
    } finally {
      setLoadingForMoveId(moveId, false);
    }
  };

  const doneFlag = groupedProducts
    .flat()
    .every(
      (item) => item.state === "done" || item.state === "checker_verified"
    );

  return (
    <View className="flex-1 relative">
      <FlatList
        data={groupedProducts}
        keyExtractor={(item, index) => `group-${index}`}
        renderItem={({ item }) => {
          const localShownOrders = new Set();
          return (
            <View className="p-4 bg-white rounded-sm overflow-hidden">
              {item.map((product) => {
                const shouldShowOrderNo = !localShownOrders.has(
                  product.order_no
                );
                if (shouldShowOrderNo) {
                  localShownOrders.add(product.order_no);
                }
                return (
                  <ProductDetails
                    key={product.move_id}
                    moveId={product.move_id}
                    orderNo={shouldShowOrderNo ? product.order_no : null}
                    productName={product.product_name
                      ?.replace(/["\t]/g, "")
                      .trim()}
                    availableQty={product.on_hand_qty}
                    expiryDate={product.lot_name}
                    batchNumber={product.expiry_date}
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
                    onPress={() => handleOnPress(product)}
                    onStatusChange={updateProductStatus}
                    type={"Checker"}
                    doneFlag={doneFlag}
                    activeName={activeName}
                    selectedDate={selectedDates[product.move_id] || null}
                    saleId={
                      activeName === "Zone Transfer"
                        ? product.id
                        : product.sale_id
                    }
                    onOrderStatusChange={onOrderStatusChange}
                    orderStaus={orderStaus}
                    loading={loadingMap[product.move_id] || false}
                  />
                );
              })}
            </View>
          );
        }}
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
        onClose={reassignSheetClose}
        onOpen={reassignSheetOpen}
        bottomSheetRef={reassignSheetRef}
        selectedProduct={selectedProduct}
        reAssignTask={reAssignTask}
        setSelectedProduct={setSelectedProduct}
        errors={errors}
        setErrors={setErrors}
        loading={loading}
      />
      <EditBottomSheet
        onClose={editSheetClose}
        onOpen={editSheetOpen}
        bottomSheetRef={editBottomSheetRef}
        selectedDate={selectedDates[activeMoveId] || null}
        setSelectedDate={(date) => {
          setSelectedDates((prev) => ({
            ...prev,
            [activeMoveId]: date,
          }));
        }}
        pickerDateUpdate={checkerDateUpdate}
        activeMoveId={activeMoveId}
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
