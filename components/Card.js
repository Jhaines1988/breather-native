import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = (props) => {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    backgroundColor: 'black',
    elevation: 7,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    width: '90%',
    maxWidth: 380,
    height: '1%',
    maxHeight: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Card;
