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
    outerMostCircle: {
      height: 300,
      width: 300,
      borderColor: 'rgba(158, 150, 248, 0.2)',
      backgroundColor: 'transparent',
      borderWidth: 3,
      borderStyle: 'solid',
      borderRadius: 250,
      transform: [{ scale: props.outerMostCircle }],
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    },
    outerCircle1: {
      height: 270,
      width: 270,
      borderRadius: 140,
      borderColor: 'rgba(158, 150, 248, 0.2)',
      backgroundColor: 'transparent',
      borderWidth: 8,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    },
    largeInnerCircle: {
      width: 150,
      height: 150,
      backgroundColor: 'rgba(158, 150, 248, 0.1)',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      transform: [{ scale: props.largeInnerCircle }],
    },
    mediumInnerCircle: {
      width: 125,
      height: 125,
      backgroundColor: 'rgba(158, 150, 248, 0.1)',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    },
    innerCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(158, 150, 248, 0.2)',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <Animated.View style={styles.outerMostCircle}>
      <Animated.View style={styles.outerCircle1}>
        <Animated.View style={styles.largeInnerCircle}>
          <Animated.View style={styles.mediumInnerCircle}>
            <Animated.View style={styles.innerCircle}></Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default BreathingCircles;
