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
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../utils/font';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const Reset = ({route, navigation}) => {
  const Type = route.params.type;
  const [time, setTime] = useState(10);
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);
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
        navigation.navigate('Reset');
      } else if (Type == 'register') {
        navigation.navigate('SignIn');
      } else {
        console.log('Can not Navigate ===> ');
      }
    } else {
      alert('otp is not matcehd');
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
                  containerStyle={[GlobalStyle.CustomButtonRestyle,styles.containerStyle]}
                  textStyle={{color: Colors.ThemeBlue, fontSize: scale(13)}}
                />
              </View>
            </View>
            <>
              <View style={{height: verticalScale(150)}} />
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
                <View
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
                    You can Reset Your password in {time}
                  </Text>
                </View>
              )}
            </>
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
});
export default Reset;
