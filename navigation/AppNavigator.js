import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen';
import { HomeNavigator, AuthNavigator } from './HomeNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FiveByFive from '../screens/FiveByFive/FiveByFive';
import BoxBreathing from '../screens/boxBreathing/BoxBreathing';
import SelectRounds from '../screens/SelectRounds';
import RapidBreathing from '../screens/rapidBreathing/RapidBreathing';
import Finished from '../screens/FinishedScreen';
import Reiterate from '../screens/reIterateAnimation/reiterate';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import { onAuthStateChange } from '../firebase';
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

  const onAuthStateChange = function (callback) {
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
      <View style={styles.centered}>
        <ActivityIndicator size='large' color='#888' />
      </View>
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
