import React from "react";
import "./global.css";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Header } from "./src/components";

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
        <Header />
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};

export default App;
