import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.description, ...props.style }}>{props.text}</Text>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 2,
    // marginVertical: 4,
    lineHeight: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default BodyText;
