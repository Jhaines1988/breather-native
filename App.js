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
// import { LogBox } from 'react-native';
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

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const testFunc = async () => {
//   // try {
//   //   const docRef = await addDoc(collection(db, 'users'), {
//   //     first: 'Ada',
//   //     last: 'Lovelace',
//   //     born: 1815,
//   //   });
//   //   console.log('Document written with ID: ', docRef.id);
//   // } catch (e) {
//   //   console.error('Error adding document: ', e);
//   // }

//   const querySnapshot = await getDocs(collection(db, 'users'));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data().toString()}`);
//   });
// };

// testFunc();
// drawerContent={(props) => <CustomDrawerContent {...props} />}
// testFunc();
export default function App() {
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
