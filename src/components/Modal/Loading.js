import React from 'react';
import {
  
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors} from '../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import ReactNativeModal from 'react-native-modal';

const Loading = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <ReactNativeModal  visible={true} style={[styles.modal,styles.Container]}>
      <View style={styles.buttons}>
          <LottieView
            autoPlay
            style={{
              height: verticalScale(150),
              alignSelf: 'center',
            }}
            source={require('../../assets/lotti/loader.json')}
          />
          <Text style={styles.text}>Please Wait</Text>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.ThemeBlue,
  },
  modal: {
    margin: 0,
  },
  buttons: {
    backgroundColor: Colors.ThemeCream,
    width:'60%'
    ,alignSelf:'center',
    borderRadius:scale(20)
  },
  text: {
    fontSize: scale(16),
    textAlign: 'center',
    padding: moderateScale(20),
    fontFamily: Font.Gilroy600,
    color: Colors.ThemeBlue,
  },
});
export default Loading;
