import { StyleSheet, Platform, Animated, Easing } from 'react-native';
import React, { useRef } from 'react';

const renderStyle = () => {
  const breathingCircle = useRef(new Animated.Value(1)).current;
  const outerCircle = useRef(new Animated.Value(1)).current;
  let styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    gradientCircle: {
      flex: 1,
      height: 140,
      width: 140,
      borderRadius: 100,
      position: 'absolute',
      top: Platform.OS === 'android' ? 210 : 280,
      transform: [{ scale: outerCircle }],
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    circle: {
      height: 70,
      width: 70,
      borderRadius: 40,
      borderWidth: 40,
      position: 'relative',
      borderColor: 'rgba(255, 255, 255, 0.85)',
      transform: [{ scale: breathingCircle }],
    },
    text: {
      alignSelf: 'center',
      bottom: 60,
      fontFamily: 'Lato-Bold',
      fontSize: 30,
    },
    round_container_5: {
      flexDirection: 'row',
      justifyContent: 'center',
      top: 18,
    },
    dot_5: {
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: 4,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#7F6C72',
    },
    currentRound: {
      fontFamily: 'Lato-Bold',
      color: 'white',
      fontSize: 44,
      position: 'absolute',
    },
  });
  return [styles, breathingCircle, outerCircle];
};
export default renderStyle;
