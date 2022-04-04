import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { auth } from '../../firebase';
import * as authActions from '../../store/actions/Authenticate';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const user = auth.currentUser;
      console.log('USER', user);

      if (!user) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      let token = user.stsTokenManager.accessToken;
      let userId = user.uid;

      if (!token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color='#888' />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
