import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
const MainButton = (props) => {
  const navigation = props.navigation;
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 40,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.buttonForeground,
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default MainButton;
