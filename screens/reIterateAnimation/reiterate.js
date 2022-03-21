import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import roundDots from '../../Helpers/roundDots';
const Reiterate = () => {
  //   const { numberOfCycles } = route.params;
  const numberOfCycles = 8;
  const [cycle, setCycle] = useState(0);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);

  // Old Value for Three Circles/
  // const smallCircle = useRef(new Animated.Value(1)).current;
  // const InnerCircle = useRef(new Animated.Value(1)).current;
  // const outerCircle = useRef(new Animated.Value(1)).current;

  // const smallestCircle = useRef(new Animated.Value(1)).current;
  // const smallOuterCircle1 = useRef(new Animated.Value(1)).current;
  // const smallOuterCircle2 = useRef(new Animated.Value(1)).current;
  const largeInnerCircle = useRef(new Animated.Value(1)).current;
  const outerMostCircle = useRef(new Animated.Value(1)).current;

  // if (Platform.OS === 'ios') {
  //   console.log(Dimensions.get('window'), 'ios');
  // }
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
        resizeOnFinish();
        // setAnimationEnabled(false);
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

  const resizeOnFinish = () => {
    Animated.parallel([
      Animated.timing(outerMostCircle, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.25, 1),
      }),
      Animated.timing(largeInnerCircle, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
    ]).start(({ finished }) => {
      setAnimationEnabled(false);
    });
  };
  const displayDots = roundDots(numberOfCycles);

  const renderDisplayDots = () => {
    const displayDots = roundDots(props.numberOfCycles);
    const dots = displayDots.map((r, i) => {
      return (
        <View
          key={i}
          style={[
            styles.displayDots,
            { backgroundColor: cycle >= i + 1 ? '#FFFFFF' : null },
          ]}></View>
      );
    });
    return (
      <View style={{ ...styles.displayDotsContainer, ...props.style }}>
        {dots}
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: Colors.plumDark,
    },
    outerMostCircle: {
      height: 300,
      width: 300,
      borderColor: 'rgba(158, 150, 248, 0.2)',
      backgroundColor: 'transparent',
      borderWidth: 3,
      borderStyle: 'solid',
      borderRadius: 250,
      transform: [{ scale: outerMostCircle }],
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
      transform: [{ scale: largeInnerCircle }],
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
    // outerCircle: {
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: 100,
    //   width: 100,
    //   borderRadius: 100,
    //   borderWidth: 100,
    //   transform: [{ scale: outerMostCircle }],
    //   borderColor: 'rgba(255,255,255,0.25)',
    // },
    // lime color
    // InnerCircle: {
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: 50,
    //   width: 50,
    //   borderRadius: 50,
    //   borderWidth: 49,
    //   borderColor: 'rgba(0, 244, 0, 0.55)',
    //   position: 'absolute',
    //   transform: [{ scale: InnerCircle }],
    // },
    // smallCircle: {
    //   // position: 'absolute',
    //   borderColor: 'rgba(255, 255, 255, 0.25)',
    //   borderWidth: 24,
    //   height: 24,
    //   width: 24,
    //   borderRadius: 24,
    //   transform: [{ scale: smallCircle }],
    //   justifyContent: 'flex-end',
    //   // alignItems: 'flex-start',
    // },
    textDotsContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    displayDotsContainer: {
      paddingTop: 270,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    displayDots: {
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: 4,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    text: {
      fontSize: 36,
      color: 'white',
      position: 'absolute',
      fontFamily: 'Lato-Regular',
      fontStyle: 'normal',
      lineHeight: 43,
      letterSpacing: 3,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    currentRoundContainer: {
      paddingTop: 500,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    currentRound: { fontSize: 22, color: 'white' },
  });
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Animated.View style={styles.outerMostCircle}>
          <Animated.View style={styles.outerCircle1}>
            <Animated.View style={styles.largeInnerCircle}>
              <Animated.View style={styles.mediumInnerCircle}>
                <Animated.View style={styles.innerCircle}></Animated.View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <View style={styles.textDotsContainer}>
          <Text style={styles.text}>{displayText}</Text>
          {numberOfCycles < 10 ? (
            <View style={styles.displayDotsContainer}>
              {renderDisplayDots()}
            </View>
          ) : (
            <View style={styles.currentRoundContainer}>
              <Text style={styles.text}>
                {cycle > 0 && cycle < numberOfCycles + 1 ? cycle : null}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Reiterate;

/*
Android Dimensions



Object {
  "fontScale": 1,
  "height": 683.4285714285714,
  "scale": 2.625,
  "width": 411.42857142857144,
} android




IOS dimenions


Object {
  "fontScale": 1,
  "height": 844,
  "scale": 3,
  "width": 390,
} ios
Most outer circle border: 1px solid rgba(158, 150, 248, 0.2);


position: absolute;
width: 809px;
height: 809px;
left: -189px;
top: 59px;

/* Plum 20

border: 1px solid rgba(158, 150, 248, 0.2);
box-sizing: border-box;



Second most outer sircle border: 8px solid rgba(158, 150, 248, 0.2);
position: absolute;
width: 717px;
height: 717px;
left: -143px;
top: 105px;
Plum 20

border: 8px solid rgba(158, 150, 248, 0.2);



third most outer circle color rgba(158, 150, 248, 0.1);
position: absolute;
width: 409px;
height: 409px;
left: 11px;
top: 259px;



4th nost outer rgba(158, 150, 248, 0.1);
position: absolute;
width: 381px;
height: 381px;
left: 25px;
top: 273px;


inner most circle rgba(158, 150, 248, 0.2);
width: 305px;
height: 305px;
left: 63px;
top: 311px;







OLD ANIMATTION


  const TimerText = () => {
    Animated.parallel([
      Animated.timing(InnerCircle, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.25, 1),
      }),
      Animated.timing(outerCircle, {
        toValue: 3,
        duration: 1500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(smallCircle, {
        toValue: 2,
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
        Animated.timing(InnerCircle, {
          toValue: 0.25,
          duration: 1000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(outerCircle, {
          toValue: 0.12,
          duration: 1000,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(smallCircle, {
          toValue: 0.25,
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
*/
