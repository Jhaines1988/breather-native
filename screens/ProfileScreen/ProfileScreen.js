import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

import LogOut from '../../components/LogOut';
const ProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>The ProfileScreen</Text>
      <LogOut />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, width: '100%', height: '100%' },
  text: { color: 'black', fontSize: 14 },
});

export default ProfileScreen;
