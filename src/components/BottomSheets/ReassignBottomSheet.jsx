import React from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import ReAssignForm from "../Form/ReAssignForm";
const ReassignBottomSheet = ({
  bottomSheetRef,
  onClose,
  selectedProduct,
  reAssignTask,
  setSelectedProduct,
  errors,
  setErrors,
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      {/* Bottom Sheet Component */}
      <RBSheet
        ref={bottomSheetRef} // Attach the reference
        height="100%" // Set the height of the bottom sheet
        closeOnDragDown={true} // Allow closing by dragging down
        animationType="slide" // Use slide animation
        closeOnPressMask={true}
        customModalProps={{
          statusBarTranslucent: true,
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}
      >
        {/* Pass the onClose function to EditForm */}
        <ReAssignForm
          onClose={onClose}
          selectedProduct={selectedProduct}
          reAssignTask={reAssignTask}
          setSelectedProduct={setSelectedProduct}
          errors={errors}
          setErrors={setErrors}
        />
      </RBSheet>
    </View>
  );
};

export default ReassignBottomSheet;
