import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "../components";
import { DetailScreen, History, Login, SplashScreen } from "../screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Tabs">
          {(props) => <Tabs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;