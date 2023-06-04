import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { GlobalStyle } from '../../Constants/GlobalStyle';

const W = Dimensions.get('window').width;
const Splash = ({ navigation }) => {
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../../assets/image/Bacground/splash.png')}
        resizeMode="cover"
        style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: '15%' }}>
          <Image
            style={{ alignSelf: 'center' }}
            source={require('../../assets/image/logo.png')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: moderateScale(20) }}>
            <Text style={styles.Heading}>Find your favorite music</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('SignUp')}
              style={styles.EmailBox}>
              <Zocial name="email" color={Colors.White} size={scale(20)} />
              <Text style={styles.Text}>Continue with Email</Text>
            </TouchableOpacity>
            <View style={styles.Row}>
              <TouchableOpacity style={styles.Box} activeOpacity={0.6}>
                <FontAwesome
                  name="google"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.Box} activeOpacity={0.6}>
                <Entypo
                  name="facebook-with-circle"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.Account}>
            Already have an account?{' '}
            <Text
              style={styles.SignIn}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Heading: {
    color: Colors.White,
    fontFamily: Font.Gilroy600,
    fontSize: W * 0.13,
    paddingRight: moderateScale(25),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Gilroy700,
    fontSize: scale(12),
    marginLeft: scale(10),
  },
  EmailBox: {
    borderWidth: 1,
    borderColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    paddingVertical: moderateVerticalScale(12),
    width: '70%',
    alignSelf: 'center',
    borderRadius: scale(25),
    flexDirection: 'row',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Box: {
    width: '48%',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: Colors.White,
    alignItems: 'center',
    marginTop: verticalScale(20),
    paddingVertical: moderateVerticalScale(12),
  },
  Account: {
    textAlign: 'center',
    color: Colors.White,
    marginTop: verticalScale(15),
    fontSize: scale(13),
    fontFamily: Font.Gilroy700,
  },
  SignIn: {
    color: Colors.Yellow,
  },
});
export default Splash;
