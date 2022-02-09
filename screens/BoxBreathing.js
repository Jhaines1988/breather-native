import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

const image = require('../landscapeSmall.png');
const BoxBreathing = ({ route, navigation }) => {
  const [cycle, setCycle] = useState(0);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);

  const breathingCircle = useRef(new Animated.Value(1)).current;
  const outerCircle = useRef(new Animated.Value(1)).current;
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      //   alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
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
      borderColor: 'rgba(255, 255, 255, 0.85)',
      transform: [{ scale: breathingCircle }],
    },
    text: {
      alignSelf: 'center',
      bottom: 60,
      fontFamily: 'Lato-Bold',
      fontSize: 30,
      position: 'relative',
    },
    round_container_5: {
      flexDirection: 'row',
      justifyContent: 'center',
      // marginTop: 10,
      top: 10,
      // zIndex: 1,
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
      backgroundColor: cycle > 1 ? '#7F6C72' : 'black',
    },
  });
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
        out();
      }, 4000);
    });
    function out() {
      setDisplayText('Out');
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
        }, 4000);
      });
    }

    const handleDisplayTextChange = () => {};
  };
  return (
    <ImageBackground
      source={image}
      resizeMode='cover'
      style={styles.background}>
      <Animated.View style={styles.gradientCircle}></Animated.View>
      <Animated.View style={styles.circle}></Animated.View>
      <Text style={styles.text}>{displayText}</Text>
      <View style={styles.round_container_5}>
        <View style={styles.dot_5}></View>
        <View style={styles.dot_5}></View>
        <View style={styles.dot_5}></View>
        <View style={styles.dot_5}></View>
      </View>
    </ImageBackground>
  );
};

export default BoxBreathing;
