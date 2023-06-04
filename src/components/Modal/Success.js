import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { Colors } from '../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../../utils/font'
import { GlobalStyle } from '../../Constants/GlobalStyle';

const Success = ({ message, isVisible }) => {
  return (
    <Modal
      visible={isVisible}
      style={GlobalStyle.MainModal}>
      <SafeAreaView style={GlobalStyle.ModalContainer}>
        <LottieView
          autoPlay
          style={{ height: verticalScale(150), alignSelf: 'center' }}
          source={require('../../assets/lotti/success.json')}
        />
        <Text style={GlobalStyle.ModalText}>
          {message}
        </Text>
      </SafeAreaView>
    </Modal>
  );
};
export default Success;
