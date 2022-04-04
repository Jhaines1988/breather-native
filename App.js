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
import { LogBox } from 'react-native';
// import { YellowBox } from 'react-native';
import { onAuthStateChange } from './firebase';
import authReducer from './store/reducers/Authenticate';
import userDataReducer from './store/reducers/UserData';
// import LogOut from './components/LogOut';
import { authentication, db } from './firebase';
import AppNavigator from './navigation/AppNavigator';
import { HomeNavigator, AuthNavigator } from './navigation/HomeNavigator';
const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
});
// console.ignoredYellowBox = ['Setting a timer'];
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // not a fix... but this issues is closed on github. Firebase sets long timers for
  // sessions. On andriod, this throws an exception, as it sees a timer set for up to an hour when the user logs in...
  LogBox.ignoreLogs(['Setting a timer']);
  let [fontsLoaded] = useFonts({
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
  });
  // update this to expo splash screen !
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
