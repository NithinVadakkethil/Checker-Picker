import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Warning from "../../assets/icons/warning.svg"

/**
 * A reusable button component for the confirmation dialog
 */
const DialogButton = ({ onPress, text, isPrimary = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-6 py-2 rounded-3xl ${
        isPrimary ? "bg-[#03BA03]" : "bg-[#FF2020]"
      }`}
    >
      <Text
        className={`text-center font-poppins ${
          isPrimary ? "text-[#FFF]" : "text-[#FFF]"
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Confirmation Dialog Component
 *
 * @param {Object} props - Component props
 * @param {Function} props.onConfirm - Function to call when user confirms
 * @param {Function} props.onCancel - Function to call when user cancels
 * @param {string} props.message - Dialog message
 * @param {string} props.confirmText - Text for confirm button
 * @param {string} props.cancelText - Text for cancel button
 * @param {string} props.warningIconUrl - URL for the warning icon
 */
const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  message = "Are you Sure ?",
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    
    <View className="flex-row items-center justify-center bg-[#000000d0] rounded-full p-4 shadow-lg gap-4">
      <View className="flex-row items-center justify-center gap-3">
        <Warning/>
        <Text className="font-poppins text-sm text-center text-[#FFFFFF]">
          {message}
        </Text>
      </View>

      <View className="flex-row items-center justify-center gap-4">
        <DialogButton text={confirmText} onPress={onConfirm} isPrimary={true} />
        <DialogButton text={cancelText} onPress={onCancel} />
      </View>
    </View>
  );
};

export default ConfirmationDialog;
