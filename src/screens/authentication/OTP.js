import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../utils/font';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';
import CustomLotti from '../../components/Modal/CustomLotti';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  verify_email_before_password,
  verify_email_before_registration,
} from '../../redux/actions/AuthActions';
import {useDispatch, useSelector} from 'react-redux';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import LogoCard from '../../components/Card/LogoCard';

const windowHeight = Dimensions.get('window').height;
const CELL_COUNT = 4;
const OTP = ({route, navigation}) => {
  const {type, data, saveImage, user_id} = route.params;
  const dispatch = useDispatch();
  const OTP = useSelector(state => state.otp);

  const [time, setTime] = useState(10);
  const [otpResent, setOtpResent] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const WaitOTP = () => {
    setOtpResent(true);
    setTimeout(() => {
      setOtpResent(false);
    }, 2300);
  };

  const resendType = 'resendType';

  const ResendOTP = () => {
    if (type == 'forgot') {
      dispatch(verify_email_before_password(data, resendType, setTime));
    } else if (type == 'signup') {
      dispatch(verify_email_before_registration(data, resendType, setTime));
    }
  };

  const Submit = () => {
    if (value == OTP) {
      if (type == 'forgot') {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('Reset', {user_id: user_id});
        }, 2000);
      } else if (type == 'signup') {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('AccountType', {
            data: data,
            saveImage: saveImage,
          });
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
    <View style={GlobalStyle.Container}>
      <ImageBackground
        source={require('../../assets/image/Bacground/otp.png')}
        resizeMode="cover"
        style={GlobalStyle.Container}>
        <LogoCard />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.MainBox}>
            <Text style={styles.Find}>Reset Your Password</Text>
            <Text style={styles.Search}>
              Send code via email please enter the code {OTP}
            </Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[styles.center, isFocused && styles.focusCell]}>
                  <Text
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <View style={[styles.Row, {justifyContent: 'flex-end'}]}>
              <CustomButton
                title="Confirm"
                onPress={Submit}
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
                onPress={ResendOTP}
                style={[styles.containerStyle, styles.OtpBox]}>
                <Text style={styles.Text}>Press to Resend Your OTP</Text>
              </TouchableOpacity>
            ) : (
              <Pressable
                onPress={() => WaitOTP()}
                style={[styles.containerStyle, styles.OtpBox]}>
                <Text style={styles.Text}>
                  You can Reset Your OTP in {time}
                </Text>
              </Pressable>
            )}
          </>
          <CustomLotti
            isVisible={otpResent}
            source={require('../../assets/lotti/otp.json')}
            Title="Your OTP has already been send"
          />
          <Success
            isVisible={successModal}
            onClose={() => setSuccessModal(false)}
            message={'Thanks for OTP'}
          />
          <Error
            isVisible={errorModal}
            onClose={() => setErrorModal(false)}
            message={'Your OTP is not correct'}
          />
        </ScrollView>
        <ConnectionModal />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
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
  codeFieldRoot: {marginVertical: verticalScale(10)},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(60),
    height: scale(60),
    borderRadius: scale(9),
    borderColor: Colors.Main,
    borderWidth: scale(1.5),
  },
  cell: {
    fontSize: scale(24),
    color: Colors.White,
    fontFamily: Font.Gilroy400,
  },
  OtpBox: {
    width: '70%',
    marginTop: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
  },
});
export default OTP;
