import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import FormGroup from "./FormGroup";
import CloseIcon from "../../assets/icons/Close.svg";

const ReAssignForm = ({onClose, selectedProduct, reAssignTask, setSelectedProduct}) => {

  return (
    <>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-lg font-medium">Reassign Task</Text>
        </View>
        <TouchableOpacity onPress={onClose} className="p-1">
          <CloseIcon />
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <FormGroup label="From">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="From zone"
          value={selectedProduct?.fromZone}
        />
      </FormGroup>
      <FormGroup label="To">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="To zone"
          value={selectedProduct?.toZone}
        />
      </FormGroup>
      <FormGroup label="Pickers Name">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Picker name"
          value={selectedProduct?.pickerName}
        />
      </FormGroup>
      <FormGroup label="Qty">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Qty"
          value={selectedProduct?.qty}
        />
      </FormGroup>
      <FormGroup label="Batch No">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Batch no"
          value={selectedProduct?.batchNo}
        />
      </FormGroup>
      <FormGroup label="Reason">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Reason"
          onChangeText={(text) =>
            setSelectedProduct((prev) => ({
              ...prev, // Preserve previous values
              reason: text, // Update only the reason field
            }))
          }
        />
      </FormGroup>

      {/* Save Button */}
      <TouchableOpacity
        onPress={()=> reAssignTask(selectedProduct?.moveId, selectedProduct?.reason)}
        className="bg-[#144D4D] py-3 rounded-md mt-4"
      >
        <Text className="text-white text-center font-medium">Add</Text>
      </TouchableOpacity>
    </>
  );
};

export default ReAssignForm;
