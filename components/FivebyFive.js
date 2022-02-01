import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

// const image = { uri: 'https://unsplash.com/photos/h7FysA92Jww' };
// const image = { uri: 'https://reactjs.org/logo-og.png' };
const image = require('../landscapeSmall.png');
import roundDots from '../Helpers/roundDots';
const FiveByFive = function (props) {
  //   const [cycle, setCycle] = useState(0);
  //   const [roundsCompleted, setRoundsCompleted] = useState(1);
  //   const totalTime = 11000;
  //   const breatheTime = 5500;
  //   const rounds = Number(props.rounds || 4);

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
    // <View className='outer_container_five'>
    //   <View className='container_five' id='container_five' ref={containerRef}>
    //     <View className='circle_five' id='circle_five' ref={circleRef}></View>
    //     <View className='gradient-circle_five'></View>
    //   </View>
    //   <View className='round-container_5' ref={roundsRef}>
    //     {roundArray.map((rounds) => {
    //       return <Text key={rounds} id={rounds} className='dot_5'></Text>;
    //     })}
    //   </View>
    //   <View id='text' className='text_five' ref={textRef}></View>
    // </View>
    <View style={styles.outerContainerFive}>
      <ImageBackground
        source={image}
        resizeMode='cover'
        style={styles.background}></ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainerFive: {
    flex: 1,
    // flexDirection: 'row',
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  background: {
    flex: 1,
    // justifyContent: 'center',
  },
  text: {},
});
export default FiveByFive;
