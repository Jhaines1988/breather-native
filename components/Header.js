import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
});

export default Header;
