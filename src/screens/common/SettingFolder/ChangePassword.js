import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import {Font} from '../../../utils/font';

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        Notification={true}
        BackArrow={true}
        Title={true}
        Text="Change Password"
      />
      <Text style={styles.Heading}>Did you forgot {`\n`}your Password</Text>
      <CustomInput
        Fontisto={true}
        Fontisto_Name="unlocked"
        size={scale(20)}
        control={control}
        name="old_password"
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
        secureTextEntry={true}
        keyboardType="default"
        placeholder="Password"
        maxLength={20}
        placeholderTextColor={'#32323266'}
      />
      <CustomInput
        Fontisto={true}
        Fontisto_Name="unlocked"
        size={scale(20)}
        control={control}
        name="new_password"
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
        secureTextEntry={true}
        keyboardType="default"
        placeholder="New Password"
        maxLength={20}
        placeholderTextColor={'#32323266'}
      />
      <CustomInput
        Fontisto={true}
        Fontisto_Name="unlocked"
        size={scale(20)}
        control={control}
        name="confirm_password"
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
        secureTextEntry={true}
        keyboardType="default"
        placeholder="Confirm Password"
        maxLength={20}
        placeholderTextColor={'#32323266'}
      />
      <CustomButton
        title="Change Password"
        containerStyle={styles.containerStyle}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
    paddingHorizontal: moderateScale(15),
  },
  Heading: {
    textAlign: 'center',
    fontSize: scale(25),
    color: Colors.White,
    fontFamily: Font.Gilroy700,
    marginVertical: verticalScale(10),
  },
  containerStyle: {
    marginTop: verticalScale(20),
    width: '95%',
  },
});
export default ChangePassword;
