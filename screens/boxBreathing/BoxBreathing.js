import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, View, Text, StyleSheet } from 'react-native';

import roundDots from '../../Helpers/roundDots';
import renderStyle from './boxBreathingStyles';

const BoxBreathing = ({ route, navigation }) => {
  const { numberOfCycles } = route.params;
  const [cycle, setCycle] = useState(0);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const smallCircle = useRef(new Animated.Value(1)).current;
  const InnerCircle = useRef(new Animated.Value(1)).current;
  const outerCircle = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animationEnabled) {
      setAnimationEnabled(true);
    }

    if (cycle < numberOfCycles) {
      TimerText();
    }

    return () => {
      if (cycle === numberOfCycles - 1) {
        setDisplayText('Done');
        setAnimationEnabled(false);
      }
    };
  }, [cycle]);

  useEffect(() => {
    return () => {
      setAnimationEnabled(false);
    };
  });

  const TimerText = () => {
    Animated.parallel([
      Animated.timing(InnerCircle, {
        toValue: 2,
        duration: 4000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(outerCircle, {
        toValue: 3,
        duration: 4000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(smallCircle, {
        toValue: 2,
        duration: 4000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
    ]).start(({ finished }) => {
      setDisplayText('Hold');
      setTimeout(() => {
        setDisplayText('Out');
        out();
      }, 4000);
    });
    function out() {
      Animated.parallel([
        Animated.timing(InnerCircle, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(outerCircle, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(smallCircle, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
      ]).start(({ finished }) => {
        setDisplayText('Hold');
        setTimeout(() => {
          setDisplayText('In');
          setCycle(cycle + 1);
        }, 4000);
      });
    }
  };

  const displayDots = roundDots(numberOfCycles);

  const renderDisplayDots = () => {
    return displayDots.map((r, i) => {
      return (
        <View
          key={i}
          style={[
            styles.dot_5,
            { backgroundColor: cycle >= i + 1 ? '#7F6C72' : null },
          ]}></View>
      );
    });
  };
  const styles = StyleSheet.create({
    container: { flex: 1 },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    },
    outerCircle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100,
      borderRadius: 100,
      borderWidth: 100,
      transform: [{ scale: outerCircle }],
      borderColor: 'rgba(255,255,255,0.25)',
    },
    // lime color
    InnerCircle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 50,
      borderRadius: 50,
      borderWidth: 49,
      borderColor: 'rgba(0, 244, 0, 0.55)',
      position: 'absolute',
      transform: [{ scale: InnerCircle }],
    },
    smallCircle: {
      position: 'absolute',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      borderWidth: 24,
      height: 24,
      width: 24,
      borderRadius: 24,
      transform: [{ scale: smallCircle }],
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    displayDotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    displayDots: {
      alignSelf: 'center',
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: 4,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#7F6C72',
    },
    text: { fontSize: 22, color: 'white', position: 'absolute' },
    currentRoundContainer: {
      flexDirection: 'column-reverse',

      bottom: 55,
    },
    currentRound: { fontSize: 22, color: 'white' },
  });
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Animated.View style={styles.outerCircle}>
          <Animated.View style={styles.InnerCircle}>
            <Animated.View style={styles.smallCircle}></Animated.View>
          </Animated.View>
        </Animated.View>
        <Text style={styles.text}>{displayText}</Text>
        {numberOfCycles < 10 ? (
          <View style={styles.displayDotsContainer}>{renderDisplayDots()}</View>
        ) : null}
        <View style={styles.currentRoundContainer}>
          <Text style={styles.currentRound}>{cycle + 1}</Text>
        </View>
      </View>
    </View>
  );
};

export default BoxBreathing;
