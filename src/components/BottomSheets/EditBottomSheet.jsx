import React from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import EditForm from "../Form/EditForm";

const EditBottomSheet = ({bottomSheetRef, onClose}) => {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Bottom Sheet Component */}
      <RBSheet
        ref={bottomSheetRef} // Attach the reference
        height={300} // Set the height of the bottom sheet
        closeOnDragDown={true} // Allow closing by dragging down
        animationType="slide" // Use slide animation
        closeOnPressMask={true}
        customModalProps={{
          statusBarTranslucent: true
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
        <EditForm onClose={onClose} />
      </RBSheet>
    </View>
  );
};

export default EditBottomSheet;
