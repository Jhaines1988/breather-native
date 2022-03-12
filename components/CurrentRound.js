import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentRound = (props) => {
  return (
    <View style={{ ...props.style, ...styles.currentRoundContainer }}>
      <Text style={styles.currentRound}>{props.cycle + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentRoundContainer: {
    flexDirection: 'column-reverse',
    bottom: 55,
  },
  currentRound: { fontSize: 22, color: 'white' },
});

export default CurrentRound;
