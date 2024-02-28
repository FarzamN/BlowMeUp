import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { Colors } from '../../utils/Colors';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { verticalScale } from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';

const ConnectionModal = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Modal
      isVisible={!isConnected}
      style={[GlobalStyle.MainModal, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
      <View style={GlobalStyle.ModalContainer}>
        <LottieView
          autoPlay
          style={[GlobalStyle.LottieView, { marginVertical: verticalScale(13) }]}
          source={require('../../assets/lotti/noInternetConnection.json')}
        />
        <Text style={[GlobalStyle.ModalText, { color: Colors.Danger }]}>
          {"You don't have internet connection"}
        </Text>
      </View>
    </Modal>
  );
};

export default ConnectionModal;
