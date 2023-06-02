import {StyleSheet, Text,  SafeAreaView,View,Keyboard,TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import {Font} from '../../../utils/font';
import PasswordInput from '../../../components/PasswordInput';
import { GlobalStyle } from '../../../Constants/GlobalStyle';

const ChangePassword = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = data =>{
    if (data.new_password == data.confirm_password) {
      navigation.goBack()
    } else {
      alert('Password is not matched')
    }
  }
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
      <View style={{paddingHorizontal:moderateScale(15)}}>
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
        textStyle={{color:Colors.White}}
        containerStyle={[GlobalStyle.CustomButtonRestyle,{width: '90%',}]}
        onPress={handleSubmit(onSubmit)}
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
