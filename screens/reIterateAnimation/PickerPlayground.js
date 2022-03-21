import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import MainButton from '../../components/MainButton';
const PickerPlayground = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rounds, setRounds] = useState(5);
  const dummyText = `Nam a viverra vivamus magnis velit adipiscing parturient ac per at congue placerat nibh eleifend massa vitae nam integer iaculis montes eleifend consequat ligula parturient libero scelerisque per hac. Eu dictumst et gravida.`;
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.description}>{dummyText}</Text>
      <MainButton
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        title='Set Rounds'
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        style={{ backgroundColor: Colors.plum, color: Colors.plum }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: Colors.plumDark,
              width: '100%',
              height: '45%',
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
            }}>
            <Picker
              mode='dropdown'
              selectedValue={rounds}
              style={{
                height: '50%',
                width: '100%',
                color: 'white',
                backgroundColor: Colors.plumDark,
              }}
              itemStyle={{
                height: '100%',
                width: '100%',
                color: 'white',
                backgroundColor: Colors.plumDark,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setRounds(itemValue);
              }}>
              <Picker.Item label={'5'} value={5} />
              <Picker.Item label={'10'} value={10} />
              <Picker.Item label={'15'} value={15} />
              <Picker.Item label={'20'} value={20} />
              <Picker.Item label={'25'} value={25} />
              <Picker.Item label={'30'} value={30} />
              <Picker.Item label={'35'} value={35} />
              <Picker.Item label={'40'} value={40} />
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modalClose}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <MainButton
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        title='Start'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.plumDark,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    textAlign: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  modalClose: {
    color: Colors.plumAccent,
    backgroundColor: 'rgba(158, 150, 248, 0.2)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 23,
  },
});

export default PickerPlayground;
