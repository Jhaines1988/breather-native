import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Easing } from 'react-native-reanimated';
// import { useEffect } from 'react';

// think of these questions
/*
1: where is the item right now? exact X,Y position on the screen
Animated.Value.Animated
2: where is the element moving to?
Animated.Types.Spring
3: Which element are we moving?
Animated.Components.View


*/

const MoveABall = ({ navigation }) => {
  const [cycle, setCycle] = useState(0);
  const breathingCircle = useRef(new Animated.Value(1)).current;
  const innerText = useRef(new Animated.Value(1)).current;
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  useEffect(() => {
    // change to props  rounds or default to four
    if (!animationEnabled) {
      setAnimationEnabled(true);
      TimerText();
    }

    return () => {
      if (cycle <= 2 && animationEnabled) {
      }
      // if last round bool
      // setDisplayText("finished")
    };
  }, [cycle]);

  useEffect(() => {
    return () => {
      setAnimationEnabled(false);
    };
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ball: {
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 30,
      borderColor: 'green',
      transform: [{ scale: breathingCircle }],
    },
    text: {
      alignSelf: 'center',
      bottom: 45,
      position: 'relative',
      transform: [{ scale: innerText }],
    },
  });

  const TimerText = () => {
    Animated.parallel([
      Animated.timing(breathingCircle, {
        toValue: 8,
        duration: 5500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(innerText, {
        toValue: 8,
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
        Animated.timing(breathingCircle, {
          toValue: 1,
          duration: 5500,
          useNativeDriver: true,
          Easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        Animated.timing(innerText, {
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

  return (
    <View style={styles.container}>
      <Animated.View style={styles.ball}></Animated.View>

      <Animated.Text style={styles.text}>{displayText}</Animated.Text>
    </View>
  );
};

export default MoveABall;

/*
const loopingAnimation = () => {
    Animated.sequence([
      Animated.timing(myAnimatedValue, {
        toValue: 7,
        duration: 5500,
        useNativeDriver: true,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
      }),
      Animated.timing(myAnimatedValue, {
        toValue: 1,
        duration: 5500,
        Easing: Easing.bezier(0.65, 0, 0.35, 1),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      setCycle(cycle + 1);
      setDisplayText('good');
    });
  };


  const trigger = () => {
    setTimeout(() => {
      Animated.timing(myAnimatedValue, {
        toValue: 6,
        duration: 5500,
        useNativeDriver: false,
      }).start();
    }, 1000);
  };
  const timer = function () {
    // let text = textRef.current;
    // let container = containerRef.current;
    // let circle = circleRef.current;
    // let roundsToggle = roundsRef.current.childNodes;
    // text.innerText = 'Breathe In';
    // container.className = 'container_five grow';
    Animated.timing(myAnimatedValue, {
      toValue: 6,
      duration: 5500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      // text.innerText = 'Breathe Out';
      Animated.timing(myAnimatedValue, {
        toValue: 1,
        duration: 5500,
        useNativeDriver: false,
      }).start();
      // container.className = 'container_five shrink';
      setTimeout(() => {
        setCycle(cycle + 1);

        // if (rounds > roundsCompleted) {
        //   roundsToggle[cycle].className = 'dot_5 completed_5';
        //   setRoundsCompleted(roundsCompleted + 1);
        // }
      }, breatheTime);
    }, breatheTime);
  };

    // useEffect(() => {
  //   if (cycle <= 0) {
  //     timer();
  //   }

  //   return () => {
  //     if (cycle > 0) {
  //       Animated.timing(myAnimatedValue).stop();
  //     }
  //   };
  // });




    // Animated.timing(breathingCircle, {
      //   toValue: 1,
      //   duration: 5500,
      //   useNativeDriver: true,
      //   Easing: Easing.bezier(0.65, 0, 0.35, 1),
      // }).start(({ finished }) => {
      //   setDisplayText('In');
      //   setCycle(cycle + 1);
      // });
*/
