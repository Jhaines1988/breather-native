import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

const image = require('../landscapeSmall.png');
import roundDots from '../Helpers/roundDots';
const FiveByFive = function (props) {
  // const [cycle, setCycle] = useState(0);
  // const [roundsCompleted, setRoundsCompleted] = useState(1);
  // const totalTime = 11000;
  // const breatheTime = 5500;
  // const rounds = Number(props.rounds || 4);

  //   const containerRef = useRef();
  //   const textRef = useRef();
  //   const circleRef = useRef();
  //   const roundsRef = useRef();
  //   const timer = function () {
  //     let text = textRef.current;
  //     let container = containerRef.current;
  //     let circle = circleRef.current;
  //     let roundsToggle = roundsRef.current.childNodes;
  //     text.innerText = 'Breathe In';
  //     container.className = 'container_five grow';

  //     setTimeout(() => {
  //       text.innerText = 'Breathe Out';

  //       container.className = 'container_five shrink';
  //       setTimeout(() => {
  //         setCycle(cycle + 1);
  //         if (rounds > roundsCompleted) {
  //           roundsToggle[cycle].className = 'dot_5 completed_5';
  //           setRoundsCompleted(roundsCompleted + 1);
  //         }
  //       }, breatheTime);
  //     }, breatheTime);
  //   };

  //   const roundArray = roundDots(rounds);

  //   useEffect(() => {
  //     if (cycle < rounds) {
  //       timer();
  //     }

  //     return () => {
  //       if (cycle === rounds - 1) {
  //         let text = textRef.current;
  //         text.innerText = 'Done!';
  //       }
  // if (roundsCompleted === rounds) {
  //   let body ={user:'',rounds,exercise:props.exercise}
  //   Axios.post('http://localhost:3000/completedExercise', body)
  //     .then((results) => {
  //       console.log('res', results.data);
  //     })
  //     .catch((err) => {
  //       console.log('error');
  //     });
  // }
  //     };
  //   });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode='cover'
        style={styles.background}>
        <View style={styles.outerContainerFive}>
          <View style={styles.container_5}>
            <View style={styles.circle_five}></View>
            <View style={styles.gradient_circle_5}></View>

            <Text style={styles.text}>Hello</Text>
          </View>
          <View style={styles.round_container_5}>
            <View style={styles.dot_5}></View>
            <View style={styles.dot_5}></View>
            <View style={styles.dot_5}></View>
            <View style={styles.dot_5}></View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainerFive: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '100%',
  },
  container_5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    position: 'relative',
  },
  circle_five: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    height: '100%',
    width: '100%',
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  gradient_circle_5: {
    flex: 1,
    height: 200,
    width: 200,
    // zIndex: -1,
    borderRadius: 100,
    position: 'absolute',
    top: -50,
    left: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  round_container_5: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
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
  },
  dot_5_completed_5: {
    backgroundColor: '#7F6C72',
  },
  text: {
    letterSpacing: 0.05,
    textAlign: 'center',
    lineHeight: 43,
    fontSize: 20,
  },
});
// export default FiveByFive;
