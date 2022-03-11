import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import RenderStyleAndAnimation from '../../constants/AnimationStyle';
import roundDots from '../../Helpers/roundDots';
const FiveByFive = ({ route, navigation }) => {
  const { numberOfCycles } = route.params;
  const [cycle, setCycle] = useState(0);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [styles, InnerCircle, outerCircle, smallCircle] =
    RenderStyleAndAnimation();
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
        duration: 5500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.25, 1),
      }),
      Animated.timing(outerCircle, {
        toValue: 3,
        duration: 5500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(smallCircle, {
        toValue: 2,
        duration: 5500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
    ]).start(({ finished }) => {
      setDisplayText('Out');
      out();
    });
    function out() {
      Animated.parallel([
        Animated.timing(InnerCircle, {
          toValue: 1,
          duration: 5500,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(outerCircle, {
          toValue: 1,
          duration: 5500,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(smallCircle, {
          toValue: 1,
          duration: 5500,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
      ]).start(({ finished }) => {
        setDisplayText('In');
        setCycle(cycle + 1);
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
            styles.displayDots,
            { backgroundColor: cycle >= i + 1 ? '#7F6C72' : null },
          ]}></View>
      );
    });
  };

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

export default FiveByFive;
