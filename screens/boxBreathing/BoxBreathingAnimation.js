import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, Easing, Platform } from 'react-native';

const BoxBreathingAnimation = (setCycle, setDisplayText, cycle) => {
  // const smallCircle = useRef(new Animated.Value(1)).current;
  // const InnerCircle = useRef(new Animated.Value(1)).current;
  // const outerCircle = useRef(new Animated.Value(1)).current;
  const largeInnerCircle = useRef(new Animated.Value(1)).current;
  const outerMostCircle = useRef(new Animated.Value(1)).current;
  const BreathingCycle = (setCycle, setDisplayText, cycle) => {
    Animated.parallel([
      Animated.timing(outerMostCircle, {
        toValue: 3,
        duration: 4000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(largeInnerCircle, {
        toValue: Platform.OS === 'android' ? 1.5 : 1.8,
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
        Animated.timing(outerMostCircle, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(largeInnerCircle, {
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

  return [outerMostCircle, largeInnerCircle, BreathingCycle];
};

export default BoxBreathingAnimation;
