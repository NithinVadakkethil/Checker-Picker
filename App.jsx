import React from 'react';
import "./global.css"
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};

export default App;
