import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';
import { useDispatch } from 'react-redux';
import { Button, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import TheHomeScreen from '../screens/TheHomeScreen/TheHomeScreen';
import FiveByFive from '../screens/FiveByFive/FiveByFive';
import BoxBreathing from '../screens/boxBreathing/BoxBreathing';
import SelectRounds from '../screens/SelectRoundsScreen/SelectRounds';
import RapidBreathing from '../screens/rapidBreathing/RapidBreathing';
import Finished from '../screens//FinishedScreen/FinishedScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { Colors } from '../constants/Colors';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import { HeaderBackButton } from '@react-navigation/elements';
const HomeTabNavigator = createBottomTabNavigator();
export const HomeNavigator = (props) => {
  return (
    <HomeTabNavigator.Navigator
      initialRouteName={'Home'}
      screenOptions={{ headerShown: false }}>
      <HomeTabNavigator.Screen
        name='Home'
        component={TheHomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.plumDark },
          headerTintColor: '#fff',
          // headerTransparent: true,

          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            textAlign: 'center',
          },
        }}
      />
      <HomeTabNavigator.Screen name='Profile' component={ProfileScreen} />
      <HomeTabNavigator.Screen name='History' component={HistoryScreen} />
    </HomeTabNavigator.Navigator>
  );
};
const ExerciseStackNavigator = createNativeStackNavigator();

export const ExerciseNavigator = (props) => {
  return (
    <ExerciseStackNavigator.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{ headerShown: false }}>
      <HomeTabNavigator.Screen name='HomeScreen' component={HomeNavigator} />

      <ExerciseStackNavigator.Screen
        name='BoxBreathing'
        component={BoxBreathing}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: true,
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackVisible: true,
        }}
      />
      <ExerciseStackNavigator.Screen
        name='FiveByFive'
        component={FiveByFive}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: true,
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
      <ExerciseStackNavigator.Screen
        name='RapidBreathing'
        component={RapidBreathing}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: true,
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackVisible: true,
        }}
      />
      <ExerciseStackNavigator.Screen
        name='SelectRounds'
        component={SelectRounds}
        options={{
          title: null,
          animation: 'none',
          // title: Platform.OS === 'android' ? 'Cancel' : null,
          headerShown: true,
          headerStyle: { backgroundColor: Colors.plumDark },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            textAlign: 'center',
          },
          headerLeftContainerStyle: { marginLeft: 22 },
          headerBackTitle: 'Cancel',
          headerBackTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            textAlign: 'center',
          },
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          // headerLeft: () => (
          //   <HeaderBackButton
          //     label='cancel'
          //     labelVisible={false}
          //     tintColor='white'
          //     // labelVisible={true}
          //     canGoBack={true}
          //     labelStyle={{ fontSize: 22, color: 'white' }}
          //   />
          // ),
        }}
      />
      <ExerciseStackNavigator.Screen
        name='Finished'
        component={Finished}
        // options={{ headerShown: false }}
      />
    </ExerciseStackNavigator.Navigator>
  );
};
const AuthStackNavigator = createNativeStackNavigator();
export const AuthNavigator = (props) => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name='Auth' component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};
