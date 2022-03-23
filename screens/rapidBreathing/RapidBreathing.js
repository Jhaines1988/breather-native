import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import BreathingCircles from '../../components/BreathingCircles';
import RenderDisplayDots from '../../components/DisplayDots';
import CurrentRound from '../../components/CurrentRound';
import RapidBreathingAnimation from '../../components/RapidBreathingAnimation';
import * as userActions from '../../store/actions/UserData';
const RapidBreathing = ({ route, navigation }) => {
  const { numberOfCycles } = route.params;
  const [cycle, setCycle] = useState(0);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const dispatch = useDispatch();

  const sendUserData = async () => {
    try {
      await dispatch(userActions.postUserData('Tummo Style', numberOfCycles));
      setTimeout(() => {
        navigation.navigate('Finished', {
          numberOfCycles: numberOfCycles,
          exercise: 'Tummo Style',
        });
      }, 3000);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const [outerMostCircle, largeInnerCircle, BreathingCycle] =
    RapidBreathingAnimation();

  useEffect(() => {
    if (!animationEnabled) {
      setAnimationEnabled(true);
    }

    if (cycle < numberOfCycles) {
      BreathingCycle(setCycle, setDisplayText, cycle);
    }

    return () => {
      if (cycle === numberOfCycles - 1) {
        setDisplayText('Done');
        sendUserData();
        resizeOnFinish();
      }
    };
  }, [cycle]);

  useEffect(() => {
    return () => {
      setAnimationEnabled(false);
    };
  });

  const resizeOnFinish = () => {
    Animated.parallel([
      Animated.timing(outerMostCircle, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.25, 1),
      }),
      Animated.timing(largeInnerCircle, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
    ]).start(({ finished }) => {
      setAnimationEnabled(false);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <BreathingCircles
          outerMostCircle={outerMostCircle}
          largeInnerCircle={largeInnerCircle}
        />
        <View style={styles.textDotsContainer}>
          <Text style={styles.text}>{displayText}</Text>
          {numberOfCycles < 10 ? (
            <RenderDisplayDots numberOfCycles={numberOfCycles} cycle={cycle} />
          ) : (
            <View style={styles.currentRoundContainer}>
              <Text style={styles.text}>
                {cycle > 0 && cycle < numberOfCycles + 1 ? cycle : null}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.plumDark,
  },
  textDotsContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 36,
    color: 'white',
    position: 'absolute',
    fontFamily: 'Lato-Regular',
    fontStyle: 'normal',
    lineHeight: 43,
    letterSpacing: 3,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  currentRoundContainer: {
    paddingTop: 500,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  currentRound: { fontSize: 22, color: 'white' },
});
export default RapidBreathing;
