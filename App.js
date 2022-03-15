import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FiveByFive from './screens/FiveByFive/FiveByFive';
import Home from './screens/Home';
import BoxBreathing from './screens/boxBreathing/BoxBreathing';
import RapidBreathing from './screens/rapidBreathing/RapidBreathing';
import Reiterate from './screens/reIterateAnimation/reiterate';
import SelectRounds from './screens/SelectRounds';
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // cange initial route name back to HOME!
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='FiveByFive' component={FiveByFive} />
        <Stack.Screen name='BoxBreathing' component={BoxBreathing} />
        <Stack.Screen name='RapidBreathing' component={RapidBreathing} />
        <Stack.Screen name='Reiterate' component={Reiterate} />
        <Stack.Screen name='SelectRounds' component={SelectRounds} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
