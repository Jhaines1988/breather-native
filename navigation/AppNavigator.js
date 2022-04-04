import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen/StartupScreen';
import { HomeNavigator, AuthNavigator } from './HomeNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ExerciseNavigator } from './HomeNavigator';

const AppNavigator = (props) => {
  const [currentUser, setCurrentUser] = useState({ loggedIn: false });
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setCurrentUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const onAuthStateChange = async function (callback) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({ loggedIn: true });
      } else {
        callback({ loggedIn: false });
      }
    });
  };

  if (!currentUser.loggedIn) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isAuth && <ExerciseNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
export default AppNavigator;
