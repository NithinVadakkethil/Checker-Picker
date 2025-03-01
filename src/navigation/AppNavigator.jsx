import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from '../components';
import {DetailScreen} from '../screens';
import tabData from '../constants/tabData';
import History from '../screens/History';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
