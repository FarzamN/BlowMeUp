import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import { Font } from '../../../utils/font';
import PasswordInput from '../../../components/PasswordInput';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import CustomLotti from '../../../components/Modal/CustomLotti';
import Error from '../../../components/Modal/Error';

const ChangePassword = ({ navigation }) => {
  const [passwordChange, setPasswordChange] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const Password = 123456789
  const onSubmit = data => {
    if (data.password == Password) {
      if (data.new_password == data.confirm_password) {
        setPasswordChange(true)
        setTimeout(() => {
          setPasswordChange(false);
          navigation.goBack()
        }, 2000);
      } else {
        setErrorModal(true)
        setTimeout(() => {
          setErrorModal(false);
        }, 2000);
      }
    }
    else {
      // alert('data not found in data base')
      setPasswordError(true)
      setTimeout(() => {
        setPasswordError(false);
      }, 2000);
    }
  }
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar
      })
    }),
  )
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <MainHeader
          Notification={true}
          BackArrow={true}
          Title={true}
          Text="Change Password"
        />
        <Text style={styles.Heading}>Did you forgot your Password?</Text>
        <View style={{ paddingHorizontal: moderateScale(15) }}>
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
            <Text style={GlobalStyle.error}>
              {errors.password.message}
            </Text>
          )}
          <PasswordInput
            fontSize={scale(16)}
            control={control}
            name="new_password"
            rules={{
              required: '*New Password is required To Reset',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
            }}
            placeholder="New Password"
            maxLength={20}
            placeholderTextColor={'#32323266'}
          />
          {errors.new_password && (
            <Text style={GlobalStyle.error}>
              {errors.new_password.message}
            </Text>
          )}
          <PasswordInput
            fontSize={scale(16)}
            control={control}
            name="confirm_password"
            rules={{
              required: '*Confirm Password is required To Reset',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
            }}
            placeholder="Confirm Password"
            maxLength={20}
            placeholderTextColor={'#32323266'}
          />
          {errors.confirm_password && (
            <Text style={GlobalStyle.error}>
              {errors.confirm_password.message}
            </Text>
          )}
          <CustomButton
            title="Change Password"
            textStyle={{ color: Colors.White }}
            containerStyle={[GlobalStyle.CustomButtonRestyle, { width: '90%', }]}
            onPress={handleSubmit(onSubmit)}
          />
          <CustomLotti
            isVisible={passwordChange}
            source={require('../../../assets/lotti/passwordchange.json')}
            Title="Password has been changed"
            TextRestyle={{ color: Colors.ThemeBlue }}
          />

          <Error
            isVisible={errorModal}
            message={'Password is not matched'}
          />
          {/* <Error
            isVisible={passwordError}
            message={'Password is not found in our data base'}
          /> */}
          <CustomLotti
            isVisible={passwordError}
            source={require('../../../assets/lotti/passwrderror.json')}
            Title="Password is not found in our data base"
            TextRestyle={{ color: Colors.Danger }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  Heading: {
    textAlign: 'center',
    fontSize: scale(25),
    color: Colors.White,
    fontFamily: Font.Gilroy700,
    marginVertical: verticalScale(10),
  }
});
export default ChangePassword;
