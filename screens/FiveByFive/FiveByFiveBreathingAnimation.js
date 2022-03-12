import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

const FiveByFiveBreathingAnimation = (setCycle, setDisplayText, cycle) => {
  const smallCircle = useRef(new Animated.Value(1)).current;
  const InnerCircle = useRef(new Animated.Value(1)).current;
  const outerCircle = useRef(new Animated.Value(1)).current;

  const BreathingCycle = (setCycle, setDisplayText, cycle) => {
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

  return [InnerCircle, outerCircle, smallCircle, BreathingCycle];
};

export default FiveByFiveBreathingAnimation;
