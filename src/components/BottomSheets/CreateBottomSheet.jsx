import React, { useState } from "react";
import { KeyboardAvoidingView, View, ScrollView, Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CreateForm from "../Form/CreateForm";

const CreateBottomSheet = ({ bottomSheetRef, onClose, onTransferCreated }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Bottom Sheet Component */}
      <RBSheet
        ref={bottomSheetRef} // Attach the reference
        height={600} // Set the height of the bottom sheet
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <CreateForm onClose={onClose} onTransferCreated={onTransferCreated}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </RBSheet>
    </View>
  );
};

export default CreateBottomSheet;
