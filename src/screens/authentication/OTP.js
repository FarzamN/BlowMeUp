import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../utils/font';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';
const windowHeight = Dimensions.get('window').height;
const Reset = ({route, navigation}) => {
  const Type = route.params.type;
  const [time, setTime] = useState(10);
  const [otpResent, setOtpResent] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const OTPmodalState = () => {
    setOtpResent(true);
    setTimeout(() => {
      setOtpResent(false);
    }, 2000);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const OTP = 1234;
  const Submit = data => {
    console.log('Opt btn press');
    if (data.otp == OTP) {
      reset();
      if (Type == 'forgot') {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('Reset');
        }, 2000);
      } else if (Type == 'register') {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('SignIn');
        }, 2000);
      } else {
        console.log('Can not Navigate ===> ');
      }
    } else {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.Container}>
        <ImageBackground
          source={require('../../assets/image/Bacground/otp.png')}
          resizeMode="cover"
          style={styles.Container}>
          <Image
            style={{alignSelf: 'center', marginTop: '12%'}}
            source={require('../../assets/image/logo.png')}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.MainBox}>
              <Text style={styles.Find}>Reset Your Password</Text>
              <Text style={styles.Search}>
                Send code via email please enter the code
              </Text>
              <CustomInput
                Gapp={{paddingHorizontal: 0}}
                control={control}
                keyboardType="numeric"
                name="otp"
                rules={{
                  required: 'OTP is required',
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Enter a valid OTP',
                }}
                placeholder="Reset Password Code"
                maxLength={4}
                fontSize={scale(16)}
              />
              {errors.otp && (
                <Text style={GlobalStyle.error}>{errors.otp.message}</Text>
              )}
              <View style={[styles.Row, {justifyContent: 'flex-end'}]}>
                <CustomButton
                  title="Confirm"
                  onPress={handleSubmit(Submit)}
                  containerStyle={[
                    GlobalStyle.CustomButtonRestyle,
                    styles.containerStyle,
                  ]}
                  textStyle={{color: Colors.ThemeBlue, fontSize: scale(13)}}
                />
              </View>
            </View>
            <>
              <View style={{height: windowHeight * 0.25}} />

              {time == 0 ? (
                <TouchableOpacity
                  onPress={() => setTime(10)}
                  style={[
                    styles.containerStyle,
                    {
                      width: '70%',
                      marginTop: 0,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: scale(10),
                      marginBottom: verticalScale(10),
                    },
                  ]}>
                  <Text style={styles.Text}>Press to Resend Your OPT</Text>
                </TouchableOpacity>
              ) : (
                <Pressable
                  onPress={OTPmodalState}
                  style={[
                    styles.containerStyle,
                    {
                      width: '70%',
                      marginTop: 0,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: scale(10),
                      marginBottom: verticalScale(10),
                    },
                  ]}>
                  <Text style={styles.Text}>
                    You can Reset Your OTP in {time}
                  </Text>
                </Pressable>
              )}
            </>
            <Modal
              visible={otpResent}
              onBackButtonPress={() => setOtpResent(false)}
              onBackdropPress={() => setOtpResent(false)}
              style={styles.modal}>
              <SafeAreaView style={styles.buttons}>
                <LottieView
                  autoPlay
                  style={{height: verticalScale(150), alignSelf: 'center'}}
                  source={require('../../assets/lotti/otp.json')}
                />
                <Text style={styles.text}>
                  Your OPT has been send{'\n'}Please wait a few second
                </Text>
              </SafeAreaView>
            </Modal>
            <Success
              isVisible={successModal}
              onClose={() => setSuccessModal(false)}
              message={'Thanks for OPT'}
            />
            <Error
              isVisible={errorModal}
              onClose={() => setErrorModal(false)}
              message={'Your OTP is not current'}
            />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  Find: {
    color: Colors.Yellow,
    fontFamily: Font.Gilroy500,
    fontSize: scale(30),
    textAlign: 'center',
  },
  Search: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(16),
    textAlign: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  MainBox: {
    marginTop: '25%',
    marginBottom: '10%',
    marginHorizontal: scale(20),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: Colors.White,
    borderColor: Colors.ThemeBlue,
    width: '30%',
    height: verticalScale(40),
  },
  Text: {
    color: Colors.Black,
    fontFamily: Font.Gilroy500,
  },
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
    color: '#EF4444',
    fontSize: scale(16),
    textAlign: 'center',
    padding: moderateScale(20),
    fontFamily: Font.Gilroy600,
  },
});
export default Reset;
