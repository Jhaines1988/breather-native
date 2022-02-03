import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import FiveByFive from './components/FivebyFive';
import MoveABall from './animationPlayground/MoveABall';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <FiveByFive />
      <StatusBar style='auto' /> */}
      <MoveABall />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
