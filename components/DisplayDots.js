import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import roundDots from '../Helpers/roundDots';
const RenderDisplayDots = (props) => {
  const displayDots = roundDots(props.numberOfCycles);
  const dots = displayDots.map((r, i) => {
    return (
      <View
        key={i}
        style={[
          styles.displayDots,
          { backgroundColor: props.cycle >= i + 1 ? '#7F6C72' : null },
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
  displayDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayDots: {
    alignSelf: 'center',
    height: 16,
    width: 16,
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#7F6C72',
  },
});

export default RenderDisplayDots;
