import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import Splash from '../Splash/Splash';
import BottomTabNavigator from '../TabBar/BottomTabBar';
const Stack = createStackNavigator();
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Splash'}
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'Splash'} component={Splash} />
                <Stack.Screen name={'TabScreens'} component={BottomTabNavigator} />
            </Stack.Navigator>
    )
  }
export default function Navigator() {
  return (
    <View
      style={{
        flex: 1
      }}>
     <AppStack/>
    </View>
  );
};