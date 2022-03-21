import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, Easing, Platform } from 'react-native';

const RapidBreathingAnimation = (setCycle, setDisplayText, cycle) => {
  const largeInnerCircle = useRef(new Animated.Value(1)).current;
  const outerMostCircle = useRef(new Animated.Value(1)).current;

  const BreathingCycle = (setCycle, setDisplayText, cycle) => {
    Animated.parallel([
      Animated.timing(outerMostCircle, {
        toValue: 4,
        duration: 1500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.25, 1),
      }),
      Animated.timing(largeInnerCircle, {
        toValue: Platform.OS === 'android' ? 1.5 : 1.8,
        duration: 1500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
    ]).start(({ finished }) => {
      setDisplayText('Out');
      out();
    });
    function out() {
      Animated.parallel([
        Animated.timing(outerMostCircle, {
          toValue: 0.25,
          duration: 1000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(largeInnerCircle, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
      ]).start(({ finished }) => {
        setDisplayText('In');
        setCycle(cycle + 1);
      });
    }
  };

  return [outerMostCircle, largeInnerCircle, BreathingCycle];
};

export default RapidBreathingAnimation;
