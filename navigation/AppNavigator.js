import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen';
import { HomeNavigator, AuthNavigator } from './HomeNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FiveByFive from '../screens/FiveByFive/FiveByFive';
import BoxBreathing from '../screens/boxBreathing/BoxBreathing';
import SelectRounds from '../screens/SelectRounds';
import RapidBreathing from '../screens/rapidBreathing/RapidBreathing';
import Finished from '../screens/Finished';
const Stack = createNativeStackNavigator();
const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <HomeNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
