import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import FormGroup from "./FormGroup";
import CloseIcon from "../../assets/icons/Close.svg";

const ReAssignForm = ({
  onClose,
  selectedProduct,
  reAssignTask,
  setSelectedProduct,
  errors,
  setErrors,
  loading,
}) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseIcon(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-medium">Reassign Task</Text>
            {showCloseIcon && (
              <TouchableOpacity onPress={onClose} className="p-1">
                <CloseIcon />
              </TouchableOpacity>
            )}
          </View>

          {/* Form Fields */}
          <FormGroup label="From">
            <TextInput
              editable={false}
              className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
              placeholder="From zone"
              value={selectedProduct?.fromZone}
            />
          </FormGroup>

          <FormGroup label="To">
            <TextInput
              editable={false}
              className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
              placeholder="To zone"
              value={selectedProduct?.toZone}
            />
          </FormGroup>

          <FormGroup label="Pickers Name">
            <TextInput
              editable={false}
              className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
              placeholder="Picker name"
              value={selectedProduct?.pickerName}
            />
          </FormGroup>

          <FormGroup label="Qty">
            <TextInput
              className={`border ${
                errors.qty ? "border-red-500" : "border-[#EFEFEF]"
              } bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900`}
              placeholder="Qty"
              value={selectedProduct?.qty}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericValue = parseInt(text, 10);
                const maxQty = parseInt(selectedProduct?.actualQty, 10);

                if (!isNaN(numericValue)) {
                  if (numericValue <= maxQty) {
                    setSelectedProduct((prev) => ({ ...prev, qty: text }));
                    setErrors((prev) => ({ ...prev, qty: "" }));
                  } else {
                    setSelectedProduct((prev) => ({
                      ...prev,
                      qty: String(maxQty),
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      qty: `Qty cannot be more than ${maxQty}`,
                    }));
                  }
                } else {
                  setSelectedProduct((prev) => ({ ...prev, qty: "" }));
                }
              }}
            />
            {errors.qty ? (
              <Text className="text-red-500 text-xs mt-1">{errors.qty}</Text>
            ) : null}
          </FormGroup>

          <FormGroup label="Batch No">
            <TextInput
              editable={false}
              className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
              placeholder="Batch no"
              value={selectedProduct?.batchNo}
            />
          </FormGroup>

          <FormGroup label="Reason">
            <TextInput
              className={`border ${
                errors.reason ? "border-red-500" : "border-[#EFEFEF]"
              } bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900`}
              placeholder="Reason"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              onChangeText={(text) => {
                setErrors((prev) => ({ ...prev, reason: "" }));
                setSelectedProduct((prev) => ({ ...prev, reason: text }));
              }}
              value={selectedProduct?.reason}
            />
            {errors.reason ? (
              <Text className="text-red-500 text-xs mt-1">{errors.reason}</Text>
            ) : null}
          </FormGroup>
        </View>

        {/* Add Button */}
        <View className="">
          <TouchableOpacity
            onPress={() =>
              reAssignTask(
                selectedProduct?.moveId,
                selectedProduct?.reason,
                parseInt(selectedProduct?.qty)
              )
            }
            disabled={loading}
            className="bg-[#144D4D] py-3 rounded-md"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white text-center font-medium">Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReAssignForm;
