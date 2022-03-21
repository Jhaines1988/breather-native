import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleText = (props) => {
  return <Text style={styles.title}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 24,
    letterSpacing: 1,
    fontFamily: 'Lato-Bold',
    marginLeft: 30,
  },
});

export default TitleText;
