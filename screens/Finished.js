import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Finished = ({ route, navigation }) => {
  const homeClickHandler = () => {
    navigation.popToTop();
  };
  return (
    <View>
      <Text>Hey There</Text>
      <View>
        <Button title='Home' onPress={homeClickHandler}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: { borderRadius: 33, overflow: 'hidden' },
});

export default Finished;
