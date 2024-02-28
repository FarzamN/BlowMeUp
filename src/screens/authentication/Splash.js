import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
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
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useDispatch } from 'react-redux';
import { googleSignin } from '../../redux/actions/AuthActions';
import LogoCard from '../../components/Card/LogoCard';
import Loading from '../../components/Modal/Loading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const W = Dimensions.get('window').width;
const Splash = ({ navigation }) => {
  const OS = Platform.OS;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const googleLoginHandler = () => {
    dispatch(googleSignin(navigation, OS, setLoad));
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../../assets/image/Bacground/splash.png')}
        resizeMode="cover"
        style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: '15%' }}>
          <LogoCard style={{ marginTop: 0 }} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: moderateScale(20) }}>
            <Text style={styles.Heading}>Find your favorite music</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('SignUp', { social: 'oay' })}
              style={GlobalStyle.SocialSignInButton}>
              <Zocial name="email" color={Colors.White} size={scale(20)} />
              <Text style={styles.Text}>Continue with Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={googleLoginHandler}
              style={GlobalStyle.SocialSignInButton}>
              <FontAwesome
                name="google"
                color={Colors.White}
                size={scale(20)}
              />
              <Text style={styles.Text}>Continue with Google</Text>
            </TouchableOpacity>
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
      <Loading isVisible={load} />
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
