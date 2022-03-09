import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, View, Text } from 'react-native';

import roundDots from '../../Helpers/roundDots';
import renderStyle from './boxBreathingStyles';

const BoxBreathing = ({ route, navigation }) => {
  const [cycle, setCycle] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(2);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [styles, breathingCircle, outerCircle] = renderStyle();
  const { numberOfCycles } = route.params;

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
      Animated.timing(breathingCircle, {
        toValue: 8,
        duration: 4000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(outerCircle, {
        toValue: 8,
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
        Animated.timing(breathingCircle, {
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
      ]).start(({ finished }) => {
        setDisplayText('Hold');
        setTimeout(() => {
          setDisplayText('In');
          setCycle(cycle + 1);
          setCurrentCycle(currentCycle + 1);
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
  return (
    <View style={styles.background}>
      <Animated.View style={styles.gradientCircle}></Animated.View>
      <Animated.View style={styles.circle}></Animated.View>
      <Text style={styles.text}>{displayText}</Text>
      {numberOfCycles <= 10 ? (
        <View style={styles.round_container_5}>{renderDisplayDots()}</View>
      ) : (
        <View
          style={{
            flexDirection: 'column-reverse',
            justifyContent: 'flex-end',
            height: 8,
            bottom: 44,
            right: 10,
          }}>
          <Text style={styles.currentRound}>{cycle + 1}</Text>
        </View>
      )}
    </View>
  );
};

export default BoxBreathing;
