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
const BoxBreathing = ({ navigation }) => {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
  });
  // const {numberOfCycles} = route.params;

  return (
    <ImageBackground
      source={image}
      resizeMode='cover'
      style={styles.background}></ImageBackground>
  );
};

export default BoxBreathing;
