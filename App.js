import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FiveByFive from './screens/FiveByFive';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          // options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name='FiveByFive'
          component={FiveByFive}
          // options={{ animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
