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
  ScrollView,
} from 'react-native';

const image = require('../landscapeSmall.png');

import Card from '../components/Card';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

const Home = ({ navigation }) => {
  const [selectedExercise, setSelectedExercise] = useState('5x5');
  const [numberOfRounds, setNumberOfRounds] = useState(2);

  const placeholder =
    'Here is some Information about this breathing exercise. Here are some instructions about how to perform itHere is some Information about this breathing exercise. Here are some instructions about how to perform itHere is some Information about this breathing exercise. Here are some instructions about how to perform it';

  const changeSelectorHandler = function (event) {
    setSelectedExercise(event.target.value);
  };
  const handleSubmit = function (e) {
    let selectedRounds = rounds.current.value;
    exerciseSelector(e, selectedExercise, selectedRounds);
  };

  const numberOfRoundsSelector = () => {
    let roundsMax = 100;
    let roundsArray = [];
    for (var i = 0; i < 50; i++) {
      roundsArray.push(i);
    }

    return roundsArray.map((r, i) => {
      return (
        <Picker.Item key={i} label={`${i + 1}`} value={i + 1}></Picker.Item>
      );
    });
  };
  return (
    <View style={styles.form_container}>
      <View></View>
      <ScrollView
        bounces={false}
        directionalLockEnabled={true}
        contentContainerStyle={styles.scrollExercises}>
        <Card
          style={styles.card}
          exercise='BoxBreathing'
          navigation={navigation}>
          <TitleText title='Box Breathing' />
          <BodyText text={placeholder} />
        </Card>
        <Card style={styles.card} exercise='FiveByFive' navigation={navigation}>
          <TitleText title='Resonant Coherent Breathing' />
          <BodyText text={placeholder} />
        </Card>
        <Card
          style={styles.card}
          exercise='RapidBreathing'
          navigation={navigation}>
          <TitleText title='Tummo Style' />
          <BodyText text={placeholder} />
        </Card>
        <Card style={styles.card}>
          <TitleText title='Custom' />
          <BodyText text={placeholder} />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  form_container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  scrollExercises: {
    // flexGrow: 1,
    // // height: '100%',
    // alignSelf: 'center',
    // marginLeft: 10,
    // marginVertical: 8,
    paddingVertical: 40,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner_form_container: {
    flex: 0.7,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  main_heading: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 20,
    color: '#0D2968',
  },
  home_info: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    color: '#7F6C72',
  },

  label: {
    // top: 15,
    fontFamily: 'Lato-Regular',
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
    fontFamily: 'Lato-Regular',
    // borderBottomColor: 'black',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label_rounds: {
    fontFamily: 'Lato-Regular',
    lineHeight: 20,
    fontSize: 14,
    letterSpacing: 0.05,
    bottom: Platform.OS === 'android' ? 0 : 86,
    textAlign: 'center',
  },
  rounds: { bottom: 29 },

  round_items: {
    fontFamily: 'Lato-Regular',
    bottom: 100,
    paddingVertical: 55,
  },
});

export default Home;
/*
 <View style={styles.inner_form_container}>
        <Text style={styles.main_heading}> Take a Breather </Text>
        <Text style={styles.home_info}>
          Choose the style of breathing exercise and number of rounds you want
          to do. Breather will provide visual cues throughout your exercise and
          let you know when you're done.
        </Text>



        <Text style={styles.label}>Choose Your Exercise</Text>

        <Picker
          numberOfLines={1}
          mode='dropdown'
          prompt='testing'
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
          <Picker.Item
            label='Rapid Breathing'
            value='Rapid Breathing'></Picker.Item>
        </Picker>
        <Text style={styles.label_rounds}>Set Number Of Rounds</Text>
        <Picker
          numberOfLines={1}
          mode='dropdown'
          style={styles.rounds}
          itemStyle={styles.round_items}
          selectedValue={numberOfRounds}
          onValueChange={(itemValue, itemIndex) => {
            setNumberOfRounds(itemValue);
          }}>
          {numberOfRoundsSelector()}
        </Picker>
        <Button
          title='Start'
          onPress={() => {
            if (selectedExercise === '5x5') {
              navigation.navigate('FiveByFive', {
                numberOfCycles: numberOfRounds,
              });
            } else if (selectedExercise === 'Box Breathing') {
              navigation.navigate('BoxBreathing', {
                numberOfCycles: numberOfRounds,
              });
            } else if (selectedExercise === 'Rapid Breathing') {
              navigation.navigate('RapidBreathing', {
                numberOfCycles: numberOfRounds,
              });
            }
          }}></Button>
      </View> */
