import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import CustomButton from '../../components/CustomButton';
import { useDispatch } from 'react-redux';
import PasswordInput from '../../components/PasswordInput';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { googleSignin, login } from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import  Netinfo from '@react-native-community/netinfo';
import Validation from '../../components/Validation';
import LogoCard from '../../components/Card/LogoCard';

const SignIn = ({ navigation }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
   
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const Submit = data => {
    dispatch(login(data,setSuccessModal, setErrorModal, setLoading));
  };



  const googleLoginHandler =  () => {
   dispatch(googleSignin(navigation))
  };

  useEffect(() => {
    const unsubscribe = Netinfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  return (
      <View style={GlobalStyle.Container}>
        <ImageBackground
          source={require('../../assets/image/Bacground/splash.png')}
          resizeMode="cover"
          style={GlobalStyle.Container}>
        <LogoCard />
          <Text style={styles.SignUpText}>Sign In</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: moderateScale(20) }}>
              <CustomInput
                fontSize={scale(16)}
                MaterialIcons={true}
                MaterialIcons_Name="email"
                size={scale(20)}
                control={control}
                keyboardType="email-address"
                name="email"
                rules={{
                  required: '*Email is required',
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Email is not valid',
                  },
                }}
                placeholder="Email Address"
              />
              {errors.email && (
                <Validation title={errors.email.message}/>
              )}
          
              <PasswordInput
                fontSize={scale(16)}
                control={control}
                name="password"
                rules={{
                  required: '*Password is required',
                  minLength: {
                    value: 8,
                    message: '*Password too short (minimum length is 8)',
                  },
                  maxLength: {
                    value: 16,
                    message: '*Password too long (maximum length is 16)',
                  },
                }}
                placeholder="Password"
                maxLength={20}
                placeholderTextColor={'#32323266'}
              />
              {errors.password && (
                <Validation title={errors.password.message}/>
              )}
              <Text
                onPress={() => navigation.navigate('FindAccount')}
                style={styles.Forget}>
                Forget Password?
              </Text>
              <CustomButton
                onPress={handleSubmit(Submit)}
                title="Sign in"
                containerStyle={GlobalStyle.CustomButtonRestyle}
                textStyle={{
                  color: Colors.White,
                  fontSize: scale(18),
                }}
              />
            </View>
            <View
              style={[
                GlobalStyle.Row,
                {
                  justifyContent: 'center',
                  marginTop: '12%',
                  marginBottom: '8%',
                },
              ]}>
              <View style={[styles.Border, { marginRight: scale(15) }]} />
              <Text style={styles.Sign_in_with}>or Sign in with</Text>
              <View style={[styles.Border, { marginLeft: scale(15) }]} />
            </View>
            <View style={[GlobalStyle.Row, { justifyContent: 'space-evenly' }]}>
              <TouchableOpacity onPress={() => {
                  googleLoginHandler();
                }} style={[GlobalStyle.SocialSignInButton,{width: '42%'}]} activeOpacity={0.6}>
                <FontAwesome
                  name="google"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyle.SocialSignInButton,{width: '42%'}]} activeOpacity={0.6}>
                <Entypo
                  name="facebook-with-circle"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                GlobalStyle.Row,
                { justifyContent: 'space-evenly', marginTop: '20%' },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('TermsAndConditions', { path: 'auth' })
                }>
                <Text style={styles.Term}>Terms of use</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={[
                    styles.Term,
                    styles.Policy,
                  ]}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.Account}>
            {`Don't`} have an account?{' '}
            <Text
              style={styles.SignIn}
              onPress={() => navigation.navigate('SignUp', {social: 'oay'})}>
              Sign Un
            </Text>
          </Text>
            <Success
              isVisible={successModal}
              message='Success fully Sign In'
            />
            <Error
              isVisible={errorModal}
              message='Email or password is invalid'
            />
            <Loading
              isVisible={loading}
            />
              <ConnectionModal isVisible={!isConnected}/>
          </ScrollView>
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  SignUpText: {
    textAlign: 'center',
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(30),
    marginVertical: verticalScale(20),
  },
  Forget: {
    color: Colors.Yellow,
    textAlign: 'right',
    marginTop: verticalScale(15),
    marginHorizontal: scale(10),
    fontFamily: Font.Gilroy500,
    fontSize: scale(13),
  },

  Sign_in_with: {
    fontFamily: Font.Gilroy500,
    fontSize: scale(18),
    color: Colors.White,
  },
  Border: {
    borderTopWidth: scale(1.1),
    borderTopColor: Colors.White,
    width: '40%',
  },

  Box: {
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: Colors.White,
    alignItems: 'center',
    marginTop: verticalScale(20),
    paddingVertical: moderateVerticalScale(12),
  },
  Term: {
    fontFamily: Font.Gilroy700,
    fontSize: scale(14),
    color: Colors.White,
  },
  Policy:{
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: scale(10),
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
export default SignIn;
