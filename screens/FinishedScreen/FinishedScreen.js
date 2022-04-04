import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../components/MainButton';

import * as userActions from '../../store/actions/UserData';

const Finished = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const userData = useSelector((state) => state.userData.exerciseData);

  const dispatch = useDispatch();

  const { numberOfCycles, exercise } = route.params;

  // console.log('USERDATA ON FINISH', userData);
  // const token = useSelector((state) => state.auth.token);
  // const id = useSelector((state) => state.auth.userId);

  const loadUserData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(userActions.fetchUserData(exercise));
    } catch (error) {
      setError(error.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadUserData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUserData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUserData);

    return () => {
      unsubscribe();
    };
  }, [loadUserData]);

  const homeClickHandler = async () => {
    navigation.navigate('HomeScreen', { screen: 'Home' });
  };

  const profileClickHandler = async () => {
    navigation.navigate('HomeScreen', { screen: 'History' });
  };
  const dummyText = `Nam a viverra vivamus magnis velit adipiscing parturient ac per at congue placerat nibh eleifend massa vitae nam integer iaculis montes eleifend consequat ligula part`;
  const title = 'Finished!';

  if (!isLoading) {
    return (
      <View style={styles.screen}>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>Great Work!</Text>
          <Text style={styles.description}>{dummyText}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View>
            <MainButton
              title='History'
              navigation={navigation}
              onPress={profileClickHandler}
            />
          </View>
          <View>
            <MainButton
              title='Home'
              navigation={navigation}
              onPress={homeClickHandler}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text>STILL LOADING</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.plumDark,
  },
  descriptionTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 12,
  },
  text: {
    color: 'rgba(158, 150, 248, 0.8)',
    backgroundColor: '#2C253C',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginTop: 60,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  buttonContainer: {
    width: '100%',
    // height: '100%',
    borderRadius: 200,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: 'white',
    marginBottom: 66,
  },
});

export default Finished;
