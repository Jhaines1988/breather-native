import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectRounds = ({ route, navigation }) => {
  //   const { exercise, navigation } = route.params;
  const { exercise } = route.params;
  console.log(exercise);
  const [numberOfRounds, setNumberOfRounds] = useState(5);

  const startExerciseHandler = () => {
    navigation.navigate(exercise, { numberOfCycles: numberOfRounds });
  };
  const numberOfRoundsSelector = () => {
    let roundsMax = 100;
    let roundsArray = [];
    for (var i = 5; i < 51; i += 5) {
      roundsArray.push(i);
    }
    roundsArray.push('No Limit');
    return roundsArray.map((r, i) => {
      return (
        <Picker.Item
          key={i}
          style={styles.round_items}
          label={`${roundsArray[i]}`}
          value={roundsArray[i]}></Picker.Item>
      );
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Select Number Of Rounds</Text>
        <Picker
          themeVariant={'dark'}
          style={styles.roundsPicker}
          itemStyle={styles.round_items}
          numberOfLines={2}
          mode='dropdown'
          selectedValue={numberOfRounds}
          onValueChange={(itemValue, itemIndex) => {
            setNumberOfRounds(itemValue);
          }}>
          {numberOfRoundsSelector()}
        </Picker>
        <View style={styles.buttonContainer}>
          <Button title='start' onPress={startExerciseHandler} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'gray',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },

  pickerContainer: {
    flex: 0.8,
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    padding: 10,
    textAlign: 'center',
  },
  roundsPicker: {},
  round_items: {
    flex: 0.3,
    color: 'white',
    backgroundColor: 'black',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    top: Platform.OS === 'android' ? 44 : null,
    bottom: Platform.OS === 'ios' ? 44 : 0,
    backgroundColor: 'white',
    borderRadius: 66,
    overflow: 'hidden',
  },
});

export default SelectRounds;
