import React from "react";
import { View, Dimensions, Platform } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import ReAssignForm from "../Form/ReAssignForm";

const { height: screenHeight } = Dimensions.get("window");

const ReassignBottomSheet = ({
  bottomSheetRef,
  onClose,
  selectedProduct,
  reAssignTask,
  setSelectedProduct,
  errors,
  setErrors,
  loading
}) => {
  return (
    <View className="flex-1">
      <RBSheet
        ref={bottomSheetRef}
        height={650} // numeric height (e.g. 90% of screen height)
        closeOnDragDown={true}
        animationType="slide"
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
        <ReAssignForm
          onClose={onClose}
          selectedProduct={selectedProduct}
          reAssignTask={reAssignTask}
          setSelectedProduct={setSelectedProduct}
          errors={errors}
          setErrors={setErrors}
          loading={loading}
        />
      </RBSheet>
    </View>
  );
};

export default ReassignBottomSheet;
