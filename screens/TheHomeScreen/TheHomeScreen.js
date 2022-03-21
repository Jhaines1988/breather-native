import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../../components/Card';
import TitleText from '../../components/TitleText';

const TheHomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Choose An Exercise</Text>
      <Card style={styles.card} exercise='BoxBreathing' title='Box Breathing'>
        <View style={styles.textIconContainer}>
          <TitleText title='Box Breathing' />
          <AntDesign
            name='caretright'
            size={18}
            color='#9E96F8'
            style={styles.icon}
          />
        </View>
      </Card>
      <Card
        style={styles.card}
        exercise='FiveByFive'
        title='Coherent Breathing'>
        <View style={styles.textIconContainer}>
          <TitleText title='Coherent Breathing' />
          <AntDesign
            name='caretright'
            size={18}
            color='#9E96F8'
            style={styles.icon}
          />
        </View>
      </Card>
      <Card style={styles.card} exercise='RapidBreathing' title='Tummo Style'>
        <View style={styles.textIconContainer}>
          <TitleText title='Tummo Style' />
          <AntDesign
            name='caretright'
            size={18}
            color='#9E96F8'
            style={styles.icon}
          />
        </View>
      </Card>
      <Card style={styles.card} title='Custom'>
        <View style={styles.textIconContainer}>
          <TitleText title='Other' />
          <AntDesign
            name='caretright'
            size={18}
            color='#9E96F8'
            style={styles.icon}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#2C253C',
    alignItems: 'center',
  },
  card: {
    // height: '40%',
    borderRadius: 8,
    marginBottom: 24,
    width: '90%',
    height: '15%',
    color: 'black',
    backgroundColor: 'rgba(158, 150, 248, 0.2)',
    justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
  },
  textIconContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  text: {
    color: 'rgba(158, 150, 248, 0.8)',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginTop: 60,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  icon: { alignSelf: 'center', marginRight: 20 },
});

export default TheHomeScreen;