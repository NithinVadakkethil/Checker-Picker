import { View, Text, TouchableOpacity, TextInput } from "react-native";
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
}) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseIcon(true);
    }, 50); // 500ms delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-lg font-medium">Reassign Task</Text>
        </View>
        {showCloseIcon && (
          <TouchableOpacity onPress={onClose} className="p-1">
            <CloseIcon />
          </TouchableOpacity>
        )}
      </View>

      {/* Form Content */}
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
            setErrors((prev) => ({ ...prev, qty: "" }));
            setSelectedProduct((prev) => ({ ...prev, qty: text }));
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
          onChangeText={(text) => {
            setErrors((prev) => ({ ...prev, reason: "" }));
            setSelectedProduct((prev) => ({ ...prev, reason: text }));
          }}
        />
        {errors.reason ? (
          <Text className="text-red-500 text-xs mt-1">{errors.reason}</Text>
        ) : null}
      </FormGroup>

      {/* Save Button */}
      <TouchableOpacity
        onPress={() =>
          reAssignTask(
            selectedProduct?.moveId,
            selectedProduct?.reason,
            parseInt(selectedProduct?.qty)
          )
        }
        className="bg-[#144D4D] py-3 rounded-md mt-4"
      >
        <Text className="text-white text-center font-medium">Add</Text>
      </TouchableOpacity>
    </>
  );
};

export default ReAssignForm;
