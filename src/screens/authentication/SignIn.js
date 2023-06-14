import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  Image,
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
import { USER_DETAILS } from '../../redux/reducer/Holder';

const SignIn = ({ navigation }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ErrorMessage,setErrorMessage] =useState('')
  const [SuccessMessage,setSuccessMessage] =useState('')
  
   
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const Submit = data => {
    dispatch(login(data,setSuccessModal, setErrorModal, setErrorMessage,setSuccessMessage,setLoading));
  };



  const googleLoginHandler =  () => {
   dispatch(googleSignin(navigation))
  };

  
  return (
      <View style={GlobalStyle.Container}>
        <ImageBackground
          source={require('../../assets/image/Bacground/splash.png')}
          resizeMode="cover"
          style={GlobalStyle.Container}>
          <Image
            style={{ alignSelf: 'center', marginTop: '12%' }}
            source={require('../../assets/image/logo.png')}
          />
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
                <Text style={GlobalStyle.error}>{errors.email.message}</Text>
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
                <Text style={GlobalStyle.error}>{errors.password.message}</Text>
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
                styles.Row,
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
            <View style={[styles.Row, { justifyContent: 'space-evenly' }]}>
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
                styles.Row,
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
                    {
                      textShadowColor: 'rgb(0, 0, 0)',
                      textShadowOffset: { width: 2, height: 2 },
                      textShadowRadius: scale(10),
                    },
                  ]}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <Success
              isVisible={successModal}
              message={SuccessMessage}
            />
            <Error
              isVisible={errorModal}
              message={ErrorMessage}
            />
            <Loading
              isVisible={loading}
            />
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

  Row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  // width: '42%',
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
});
export default SignIn;
