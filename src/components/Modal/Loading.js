import React from 'react';
import {

  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Colors } from '../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../../utils/font';
import ReactNativeModal from 'react-native-modal'
import { GlobalStyle } from '../../Constants/GlobalStyle';

const Loading = () => {
  return (
    <SafeAreaView style={[GlobalStyle.Container, { justifyContent: 'center' }]}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <ReactNativeModal visible={true} style={[styles.modal, GlobalStyle.Container]}>
        <View style={styles.buttons}>
          <LottieView
            autoPlay
            style={{
              height: verticalScale(150),
              alignSelf: 'center',
            }}
            source={require('../../assets/lotti/loader.json')}
          />
          <Text style={GlobalStyle.ModalText}>Please Wait...</Text>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  modal: {
    margin: 0,
  },
  buttons: {
    backgroundColor: Colors.ThemeCream,
    width: '60%',
    alignSelf: 'center',
    borderRadius: scale(20)
  },

});
export default Loading;
