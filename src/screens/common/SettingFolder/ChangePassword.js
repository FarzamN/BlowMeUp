import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import {Font} from '../../../utils/font';
import PasswordInput from '../../../components/PasswordInput';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import CustomLotti from '../../../components/Modal/CustomLotti';
import Error from '../../../components/Modal/Error';
import {useSelector} from 'react-redux';
import {update_password} from '../../../redux/actions/AuthActions';
import {BaseUrl, token} from '../../../utils/url';
import {Update} from '../../../redux/actions/UserAction';
import Loading from '../../../components/Modal/Loading';
import Validation from '../../../components/Validation';

const ChangePassword = ({navigation}) => {
  const [passwordChange, setPasswordChange] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector(state => state.userDetails);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    if (data.password == userDetails.password) {
      if (data.new_password == data.confirm_password) {
        Update(data, setPasswordChange, userDetails, navigation, setLoading);
      } else {
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 2000);
      }
    } else {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 2000);
    }
  };

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        Notification={true}
        BackArrow={true}
        Title={true}
        Text="Change Password"
      />
      <Text style={styles.Heading}>Did you forgot your Password?</Text>
      <View style={{paddingHorizontal: moderateScale(15)}}>
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
        {errors.password && <Validation title={errors.password.message} />}
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
          <Validation title={errors.new_password.message} />
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
          <Validation title={errors.confirm_password.message} />
        )}
        <Validation
          restyle={{marginTop: verticalScale(20), width: '80%'}}
          title="After Your change password Your account will be Logout from this "
        />
        <CustomButton
          title="Change Password"
          textStyle={{color: Colors.White}}
          containerStyle={[GlobalStyle.CustomButtonRestyle, {width: '90%'}]}
          onPress={handleSubmit(onSubmit)}
        />
        <CustomLotti
          isVisible={passwordChange}
          source={require('../../../assets/lotti/passwordchange.json')}
          Title="Password has been changed"
          TextRestyle={{color: Colors.ThemeBlue}}
        />

        <Error isVisible={errorModal} message={'Password is not matched'} />
        <Loading isVisible={loading} />
        <CustomLotti
          isVisible={passwordError}
          source={require('../../../assets/lotti/passwrderror.json')}
          Title="Password your gave is not Current"
          TextRestyle={{color: Colors.Danger}}
        />
      </View>
    </SafeAreaView>
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
  },
});
export default ChangePassword;
