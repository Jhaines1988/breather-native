import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';

const image = require('../../landscapeSmall.png');
const Home = ({ navigation }) => {
  // const exerciseSelector = props.exerciseSelector;
  const [selectedExercise, setSelectedExercise] = useState('');
  // const rounds = useRef();
  const [numberOfRounds, setNumberOfRounds] = useState(2);

  // const [selectedExercise, setSelectedExercise] = useState('box');
  const changeSelectorHandler = function (event) {
    console.log('ex', event.target.value);
    setSelectedExercise(event.target.value);
    console.log(rounds.current.value);
  };
  const handleSubmit = function (e) {
    let selectedRounds = rounds.current.value;
    exerciseSelector(e, selectedExercise, selectedRounds);
  };
  return (
    <View style={styles.form_container}>
      <ImageBackground
        source={image}
        resizeMode='cover'
        style={styles.imageBackground}>
        <View style={styles.inner_form_container}>
          <Text style={styles.main_heading}> Take a Breather </Text>
          <Text style={styles.home_info}>
            Choose the style of breathing exercise and number of rounds you want
            to do. Breather will provide visual cues throughout your exercise
            and let you know when you're done.
          </Text>

          {/* <View style={styles.exercise_container}> */}

          <Text style={styles.label}>Choose Your Exercise</Text>

          <Picker
            numberOfLines={1}
            style={styles.exercises}
            itemStyle={styles.exercise_items}
            selectedValue={selectedExercise}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedExercise(itemValue);
            }}>
            <Picker.Item label='5x5' value='5x5'></Picker.Item>
            <Picker.Item
              label='Box Breathing'
              value='Box Breathing'></Picker.Item>
          </Picker>
          <Text style={styles.label_rounds}>Set Number Of Rounds</Text>
          <Picker
            numberOfLines={1}
            style={styles.rounds}
            itemStyle={styles.round_items}
            selectedValue={numberOfRounds}
            onValueChange={(itemValue, itemIndex) => {
              setNumberOfRounds(itemValue);
            }}>
            <Picker.Item label='2' value={2}></Picker.Item>
            <Picker.Item label='4' value={4}></Picker.Item>
            <Picker.Item label='6' value={6}></Picker.Item>
            <Picker.Item label='8' value={8}></Picker.Item>
            <Picker.Item label='10' value={10}></Picker.Item>
          </Picker>
          <Button
            title='Start'
            onPress={() =>
              navigation.navigate('Ball', {
                numberOfCycles: numberOfRounds,
              })
            }></Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  form_container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  inner_form_container: {
    flex: 0.7,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  main_heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 20,
    color: '#0D2968',
  },
  home_info: {
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    color: '#7F6C72',
  },

  label: {
    // top: 15,
    paddingBottom: 14,
    lineHeight: 20,
    fontSize: 14,
    letterSpacing: 0.05,
    textAlign: 'center',
  },

  exercises: {},
  // rounds_container: { justifyContent: 'flex-start' },

  exercise_items: {
    bottom: 70,
  },
  label_rounds: {
    lineHeight: 20,
    fontSize: 14,
    letterSpacing: 0.05,
    bottom: Platform.OS === 'android' ? 0 : 86,
    textAlign: 'center',
  },
  rounds: { bottom: 29 },

  round_items: {
    bottom: 100,
    paddingVertical: 55,
  },
});

export default Home;
