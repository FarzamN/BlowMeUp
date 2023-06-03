import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {Colors} from '../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';

const Success = ({message, isVisible, onClose, status}) => {
  return (
    <Modal
      visible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView style={styles.buttons}>
        <LottieView
          autoPlay
          style={{height: verticalScale(150), alignSelf: 'center'}}
          source={
            status
              ? require('../../assets/lotti/success.json')
              : require('../../assets/lotti/error.json')
          }
        />
        <Text style={[styles.text, {color: status ? 'green' : '#EF4444'}]}>
          {message}
        </Text>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  buttonIcon: {
    alignSelf: 'center',
  },
  buttons: {
    justifyContent: 'center',
    // height: '35%',
    // width: '60%',
    borderRadius: scale(10),
    backgroundColor: Colors.Main,
    alignSelf: 'center',
  },
  text: {
    fontSize: scale(16),
    textAlign: 'center',
    padding: moderateScale(20),
    fontFamily: Font.Gilroy600,
  },
});
export default Success;
