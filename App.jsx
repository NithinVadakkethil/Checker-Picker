import React from "react";
import "./global.css";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#FFF" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ToastProvider
          placement="top" // Position: top, bottom, center
          duration={2000} // Auto-hide time
          animationType="slide-in" // Fade, zoom-in, slide-in
          successColor="#4CAF50" // Green success toast
          dangerColor="#FF5252" // Red error toast
        >
          <AppNavigator />
        </ToastProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
