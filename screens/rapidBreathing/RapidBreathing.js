import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import BreathingCircles from '../../components/BreathingCircles';
import RenderDisplayDots from '../../components/DisplayDots';
import CurrentRound from '../../components/CurrentRound';
import RapidBreathingAnimation from '../../components/RapidBreathingAnimation';
const RapidBreathing = ({ route, navigation }) => {
  const { numberOfCycles } = route.params;
  const [cycle, setCycle] = useState(0);
  const [displayText, setDisplayText] = useState('In');
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [InnerCircle, outerCircle, smallCircle, BreathingCycle] =
    RapidBreathingAnimation();

  useEffect(() => {
    if (!animationEnabled) {
      setAnimationEnabled(true);
    }

    if (cycle < numberOfCycles) {
      BreathingCycle(setCycle, setDisplayText, cycle);
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

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <BreathingCircles
          InnerCircle={InnerCircle}
          outerCircle={outerCircle}
          smallCircle={smallCircle}
        />
        <Text style={styles.text}>{displayText}</Text>
        {numberOfCycles < 10 ? (
          <RenderDisplayDots
            style={styles.displayDotsContainer}
            numberOfCycles={numberOfCycles}
            cycle={cycle}
          />
        ) : null}
        <CurrentRound cycle={cycle} />
      </View>
    </View>
  );
};
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
  displayDotsContainer: {},

  text: { fontSize: 22, color: 'white', position: 'absolute' },
});
export default RapidBreathing;
