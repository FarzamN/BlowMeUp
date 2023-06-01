import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../utils/font';
import { GlobalStyle } from '../../Constants/GlobalStyle';

const Reset = ({route,navigation}) => {
  const Type = route.params.type
  console.log(Type)
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});


  const Submit = () => {
    console.log('Opt btn press')
    if (Type == 'forgot') {
      navigation.navigate('Reset')
    } else if (Type == 'register') {
      navigation.navigate('SignIn')
    } else {console.log('Can not Navigate ===> ')}
   }
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
        <View style={styles.MainBox}>
          <Text style={styles.Find}>Reset Your Password</Text>
          <Text style={styles.Search}>
            Send code via email please enter the code
          </Text>
          <CustomInput
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
          />
          {errors.otp && (
              <Text style={GlobalStyle.error}>
                 {errors.otp.message}
              </Text>
            )}
          <View style={[styles.Row, {justifyContent: 'flex-end'}]}>
            <CustomButton
              title="Confirm"
              onPress={handleSubmit(Submit)}
              containerStyle={styles.containerStyle}
              textStyle={{color: Colors.ThemeBlue, fontSize: scale(13)}}
            />
          </View>
        </View>
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
    borderRadius: scale(30),
    marginTop: verticalScale(30),
    width: '30%',
    height: verticalScale(40),
    marginLeft: scale(10),
  },
});
export default Reset;
