import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';

const BreathingCircles = (props) => {
  const styles = StyleSheet.create({
    outerCircle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100,
      borderRadius: 100,
      borderWidth: 100,
      transform: [{ scale: props.outerCircle }],
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
      transform: [{ scale: props.InnerCircle }],
    },
    smallCircle: {
      position: 'absolute',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      borderWidth: 24,
      height: 24,
      width: 24,
      borderRadius: 24,
      transform: [{ scale: props.smallCircle }],
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  });
  return (
    <Animated.View style={styles.outerCircle}>
      <Animated.View style={styles.InnerCircle}>
        <Animated.View style={styles.smallCircle}></Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default BreathingCircles;
