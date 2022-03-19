import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Finished = ({ route, navigation }) => {
  const homeClickHandler = async () => {
    // navigation.popToTop();
    const response = await fetch(
      'https://breather-a67b2-default-rtdb.firebaseio.com/test/MyOlrdFS7piWnvLkH8K.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: 1,
          rounds: 453,
          user: 'testUser1',
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
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
