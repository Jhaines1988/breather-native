import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Platform,
  ImageBackground,
} from 'react-native';
const image = require('../landscapeSmall.png');
import roundDots from '../Helpers/roundDots';
const RapidBreathing = ({ route, navigation }) => {
  const { numberOfCycles } = route.params;
  const [cycle, setCycle] = useState(0);
  const breathingCircle = useRef(new Animated.Value(1)).current;
  const outerCircle = useRef(new Animated.Value(1)).current;
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ball: {
      height: 70,
      width: 70,
      borderRadius: 40,
      borderWidth: 40,
      borderColor: 'rgba(255, 255, 255, 0.85)',
      transform: [{ scale: breathingCircle }],
      // top: 10,
    },
    round_container_5: {
      flexDirection: 'row',
      justifyContent: 'center',
      // marginTop: 10,
      // top: 35,
      // zIndex: 1,
      flexWrap: 'wrap',
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
    text: {
      alignSelf: 'center',
      bottom: 60,
      fontFamily: 'Lato-Bold',
      fontSize: 30,
      position: 'relative',
    },
  });

  const TimerText = () => {
    Animated.parallel([
      Animated.timing(breathingCircle, {
        toValue: 8,
        duration: 2000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(outerCircle, {
        toValue: 8,
        duration: 2000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
    ]).start(({ finished }) => {
      setDisplayText('Out');
      out();
    });
    function out() {
      Animated.parallel([
        Animated.timing(breathingCircle, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(outerCircle, {
          toValue: 1,
          duration: 1300,
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
            styles.dot_5,
            { backgroundColor: cycle >= i + 1 ? '#7F6C72' : null },
          ]}></View>
      );
    });
  };
  return (
    <ImageBackground source={image} resizeMode='cover' style={styles.container}>
      <Animated.View style={styles.gradientCircle}></Animated.View>
      <Animated.View style={styles.ball}></Animated.View>
      <Text style={styles.text}>{displayText}</Text>
      <View style={styles.round_container_5}>{renderDisplayDots()}</View>
    </ImageBackground>
  );
};

export default RapidBreathing;
