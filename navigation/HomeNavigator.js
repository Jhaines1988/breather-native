import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Home from '../screens/Home';
import LogOut from '../components/LogOut';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as authActions from '../store/actions/auth';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

import FiveByFive from '../screens/FiveByFive/FiveByFive';
import BoxBreathing from '../screens/boxBreathing/BoxBreathing';
import SelectRounds from '../screens/SelectRounds';
import RapidBreathing from '../screens/rapidBreathing/RapidBreathing';
import Finished from '../screens/Finished';
const HomeDrawerNavigator = createDrawerNavigator();
export const HomeNavigator = (props) => {
  return (
    <HomeDrawerNavigator.Navigator drawerContent={LogOut}>
      <HomeDrawerNavigator.Screen name='Home' component={Home} />
      <HomeDrawerNavigator.Screen name='Finished' component={Finished} />
      <HomeDrawerNavigator.Screen
        name='BoxBreathing'
        component={BoxBreathing}
        options={{ headerShown: false }}
      />
      <HomeDrawerNavigator.Screen
        name='SelectRounds'
        component={SelectRounds}
      />
    </HomeDrawerNavigator.Navigator>
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
