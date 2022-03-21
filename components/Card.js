import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// change name to Touchable Wrapper
const Card = (props) => {
  const navigation = useNavigation();
  const onSelectExercise = () => {
    navigation.navigate('SelectRounds', {
      exercise: props.exercise,
      title: props.title,
    });
  };
  return (
    <TouchableOpacity style={props.style} onPress={onSelectExercise}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Card;
