import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import FiveByFive from './screens/FiveByFive/FiveByFive';
// import Home from './screens/Home';
import BoxBreathing from './screens/boxBreathing/BoxBreathing';
import RapidBreathing from './screens/rapidBreathing/RapidBreathing';
import Reiterate from './screens/reIterateAnimation/reiterate';
import SelectRounds from './screens/SelectRounds';
import Finished from './screens/FinishedScreen';
// import AuthScreen from './screens/AuthScreen/AuthScreen';
import authReducer from './store/reducers/Authenticate';
// import LogOut from './components/LogOut';
import AppNavigator from './navigation/AppNavigator';
import { HomeNavigator, AuthNavigator } from './navigation/HomeNavigator';
const rootReducer = combineReducers({
  auth: authReducer,
});
const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// drawerContent={(props) => <CustomDrawerContent {...props} />}

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  // cange initial route name back to HOME!
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

// /*
//    {/* <Stack.Navigator>
//         {/* <Stack.Screen name='AuthNav' component={AuthNavigator} />
//           <Stack.Screen name='HomeNav' component={HomeNavigator} /> */
// {
//   /* <Stack.Screen name='FiveByFive' component={FiveByFive} />
//         <Stack.Screen name='BoxBreathing' component={BoxBreathing} />
//         <Stack.Screen name='RapidBreathing' component={RapidBreathing} />
//         <Stack.Screen name='SelectRounds' component={SelectRounds} />
//         <Stack.Screen
//           name='Finished'
//           component={Finished}
//           options={{
//             headerBackVisible: false,
//           }}
//         />
//       </Stack.Navigator> */
// }

// {
//   /* </NavigationContainer> */
// }
