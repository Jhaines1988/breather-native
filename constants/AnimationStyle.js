import React, { useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';

const RenderStyleAndAnimation = (props) => {
  const smallCircle = useRef(new Animated.Value(1)).current;
  const InnerCircle = useRef(new Animated.Value(1)).current;
  const outerCircle = useRef(new Animated.Value(1)).current;

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

  return [styles, InnerCircle, outerCircle, smallCircle];
};

export default RenderStyleAndAnimation;
