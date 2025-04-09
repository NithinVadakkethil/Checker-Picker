import React from "react";
import "./global.css";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import AppNavigator from "./src/navigation/AppNavigator";
import { ToastContainer, ConfirmationDialog } from "./src/components";
import { ListCountProvider } from "./src/context/ListCountContext";

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
          offset={60}
          duration={2000} // Auto-hide time
          animationType="slide-in" // Fade, zoom-in, slide-in
          renderToast={(toast) => {
            if (toast.type === "logout") {
              return (
                <ConfirmationDialog
                  onConfirm={toast.handleLogout}
                  onCancel={toast.hide}
                />
              );
            }

            return <ToastContainer message={toast.message} type={toast.type} />;
          }}
        >
          <ListCountProvider>
            <AppNavigator />
          </ListCountProvider>
        </ToastProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
