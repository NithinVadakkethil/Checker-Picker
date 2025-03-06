import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from '../components';
import {DetailScreen, History, Login} from '../screens';
import tabData from '../constants/tabData';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs">
          {props => <Tabs {...props} data={tabData} />}
        </Stack.Screen>

        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
