import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import MainButton from '../components/MainButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SelectRounds = ({ route, navigation }) => {
  const { exercise, title } = route.params;
  console.log(exercise, title);
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const dummyText = `Nam a viverra vivamus magnis velit adipiscing parturient ac per at congue placerat nibh eleifend massa vitae nam integer iaculis montes eleifend consequat ligula parturient libero scelerisque per hac. Eu dictumst et gravida.`;
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
    const items = roundsArray.map((r, i) => {
      return (
        <Picker.Item
          key={i}
          // style={styles.round_items}
          label={`${roundsArray[i]}`}
          value={roundsArray[i]}></Picker.Item>
      );
    });

    return items;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.descriptionTitleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{dummyText}</Text>
        <Text style={styles.text}>Select Number Of Rounds</Text>
      </View>
      <Picker
        style={styles.roundsPicker}
        itemStyle={styles.round_items}
        mode='dropdown'
        selectedValue={numberOfRounds}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue);
          setNumberOfRounds(itemValue);
        }}>
        {numberOfRoundsSelector()}
      </Picker>
      <View style={styles.button}>
        <MainButton title='Start' onPress={startExerciseHandler} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    backgroundColor: '#2C253C',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
  },
  descriptionTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 12,
  },
  // pickerContainer: {
  //   flex: 0.14,
  //   height: '40%',
  //   width: '100%',
  //   // backgroundColor: 'pink',
  //   // borderEndWidth: 20,
  //   // borderColor: null,
  //   borderBottomColor: 'transparent',
  //   borderTopColor: 'transparent',
  //   borderStyle: null,
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   overflow: 'hidden',
  // },
  roundsPicker: {
    // flex: 1,
    height: Platform.OS === 'android' ? '10%' : '20%',
    width: '100%',
    backgroundColor:
      Platform.OS === 'android' ? 'rgba(158, 150, 248, 0.2)' : null,
    color: 'white',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    alignContent: 'flex-start',
    fontFamily: 'Lato-Bold',
    fontSize: 23,
    marginBottom: 90,
  },

  round_items: {
    height: '100%',
    width: '100%',
    color: 'white',
    bottom: Platform.OS === 'ios' ? '50%' : null,
    fontFamily: 'Lato-Bold',
    fontSize: 23,
  },
  text: {
    color: 'rgba(158, 150, 248, 0.8)',
    backgroundColor: '#2C253C',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginTop: 60,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  button: {
    bottom: Platform.OS === 'android' ? 25 : 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectRounds;

/*
Nam a viverra vivamus magnis velit adipiscing parturient ac per at congue placerat nibh
eleifend massa vitae nam integer iaculis montes eleifend consequat ligula parturient libero
scelerisque per hac. Eu dictumst et gravida.

*/
