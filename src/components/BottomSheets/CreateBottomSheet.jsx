import React, { useState } from "react";
import { View, Platform } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CreateForm from "../Form/CreateForm";

const CreateBottomSheet = ({ bottomSheetRef, onClose, onTransferCreated }) => {
  return (
    <RBSheet
      ref={bottomSheetRef}
      height={600}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        },
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
      animationType="slide"
    >
      <CreateForm onClose={onClose} onTransferCreated={onTransferCreated} />
    </RBSheet>
  );
};

export default CreateBottomSheet;
