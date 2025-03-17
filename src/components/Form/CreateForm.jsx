import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, {useState} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import FormGroup from "./FormGroup";
import CloseIcon from "../../assets/icons/Close.svg";

const CreateForm = ({ onClose }) => {
    const [selected, setSelected] = useState([])
  const data = [
    {
      key: "1",
      value: "Zone A",
      //  disabled: true
    },
    { key: "2", value: "Zone B" },
    { key: "3", value: "Zone C" },
  ];
  return (
    <>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-lg font-medium">Creation</Text>
        </View>
        <TouchableOpacity onPress={onClose} className="p-1">
          <CloseIcon />
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <FormGroup label="Product Name">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Product Name"
          keyboardType="numeric"
        />
      </FormGroup>
      <FormGroup label="Qty">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Enter Quantity"
          keyboardType="numeric"
        />
      </FormGroup>
      <FormGroup label="Batch No">
        <TextInput
          className="border border-[#EFEFEF] bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900"
          placeholder="Batch No"
          keyboardType="numeric"
        />
      </FormGroup>
      <FormGroup label="from">
        <SelectList
          setSelected={setSelected}
          data={data}
          save="value"
          boxStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFEFEF",
            backgroundColor: "#F8F9FC",
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
          dropdownStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFEFEF",
            backgroundColor: "#FFFFFF",
          }}
        />
      </FormGroup>
      <FormGroup label="To">
        <SelectList
          setSelected={setSelected}
          data={data}
          save="value"
          boxStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFEFEF",
            backgroundColor: "#F8F9FC",
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
          dropdownStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFEFEF",
            backgroundColor: "#FFFFFF",
          }}
        />
      </FormGroup>

      {/* Save Button */}
      <TouchableOpacity
        // onPress={onSave}
        className="bg-[#144D4D] py-3 rounded-md mt-4"
      >
        <Text className="text-white text-center font-medium">Save</Text>
      </TouchableOpacity>
    </>
  );
};

export default CreateForm;
