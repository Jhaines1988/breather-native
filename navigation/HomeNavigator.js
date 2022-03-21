import React from 'react';

import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import LogOut from '../components/LogOut';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as authActions from '../store/actions/Authenticate';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import TheHomeScreen from '../screens/TheHomeScreen/TheHomeScreen';
import FiveByFive from '../screens/FiveByFive/FiveByFive';
import BoxBreathing from '../screens/boxBreathing/BoxBreathing';
import SelectRounds from '../screens/SelectRounds';
import RapidBreathing from '../screens/rapidBreathing/RapidBreathing';
import Finished from '../screens/FinishedScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PickerPlayground from '../screens/reIterateAnimation/PickerPlayground';

const HomeTabNavigator = createBottomTabNavigator();
export const HomeNavigator = (props) => {
  return (
    <HomeTabNavigator.Navigator
      drawerContent={LogOut}
      initialRouteName={'Home'}>
      <HomeTabNavigator.Screen name='Home' component={TheHomeScreen} />
      <HomeTabNavigator.Screen name='Profile' component={ProfileScreen} />
      <HomeTabNavigator.Screen name='PlayGround' component={PickerPlayground} />
    </HomeTabNavigator.Navigator>
  );
};
const ExerciseStackNavigator = createNativeStackNavigator();

export const ExerciseNavigator = (props) => {
  return (
    <ExerciseStackNavigator.Navigator>
      <HomeTabNavigator.Screen name='HomeScreen' component={HomeNavigator} />

      <ExerciseStackNavigator.Screen
        name='BoxBreathing'
        component={BoxBreathing}
        // options={{ headerShown: false }}
      />
      <ExerciseStackNavigator.Screen
        name='FiveByFive'
        component={FiveByFive}
        // options={{ headerShown: false }}
      />
      <ExerciseStackNavigator.Screen
        name='RapidBreathing'
        component={RapidBreathing}
        // options={{ headerShown: false }}
      />
      <ExerciseStackNavigator.Screen
        name='SelectRounds'
        component={SelectRounds}
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
