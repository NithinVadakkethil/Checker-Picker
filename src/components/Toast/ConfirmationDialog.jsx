import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

/**
 * A reusable button component for the confirmation dialog
 */
const DialogButton = ({ onPress, text, isPrimary = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-md ${
        isPrimary ? "bg-blue-500" : "bg-gray-200"
      }`}
    >
      <Text
        className={`text-center font-medium ${
          isPrimary ? "text-white" : "text-gray-800"
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
  warningIconUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/dc61464c4c681d05eeb5913f9bb987bdab9164b1",
}) => {
  return (
    <View className="bg-white rounded-lg p-6 shadow-lg w-80 mx-auto">
      {/* <View className="items-center mb-4">
        <Image
          source={{ uri: warningIconUrl }}
          className="w-16 h-16"
          alt="Warning Icon"
        />
      </View> */}

      <View className="mb-6">
        <Text className="text-lg font-bold text-center text-gray-800">
          {message}
        </Text>
      </View>

      <View className="flex-row justify-center space-x-4">
        <DialogButton text={confirmText} onPress={onConfirm} isPrimary={true} />
        <DialogButton text={cancelText} onPress={onCancel} />
      </View>
    </View>
  );
};

export default ConfirmationDialog;
