import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Error from '../../components/Modal/Error';
import CustomLotti from '../../components/Modal/CustomLotti';
import {update_password} from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';
const Reset = ({route, navigation}) => {
  const {user_id} = route.params;
  const [loading, setLoading] = useState(false);
  console.log('user_id reset Screen', user_id);
  const [errorModal, setErrorModal] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const type = 'auth';
  const onSubmit = data => {
    if (data.password == data.confirm_password) {
      update_password(
        data,
        setPasswordChange,
        navigation,
        user_id,
        setLoading,
        type,
      );
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
        source={require('../../assets/image/Bacground/reset.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Image
          style={{alignSelf: 'center', marginTop: '12%'}}
          source={require('../../assets/image/logo.png')}
        />
        <View style={styles.MainBox}>
          <Text style={styles.Find}>Reset Your Password</Text>
          <Text style={styles.Search}>
            Please enter your{' '}
            <Text style={{color: Colors.Yellow}}>New Password.</Text> Password
            must be on 8 characters
          </Text>
          <PasswordInput
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
            placeholder="New Password"
            maxLength={16}
            fontSize={scale(16)}
            placeholderTextColor={'#32323266'}
          />
          {errors.password && (
            <Text style={GlobalStyle.error}>{errors.password.message}</Text>
          )}
          <PasswordInput
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
            placeholder="Confirm Password"
            maxLength={16}
            fontSize={scale(16)}
            placeholderTextColor={'#32323266'}
          />
          {errors.confirm_password && (
            <Text style={GlobalStyle.error}>
              {errors.confirm_password.message}
            </Text>
          )}
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            title="Confirm"
            containerStyle={[
              GlobalStyle.CustomButtonRestyle,
              styles.containerStyle,
            ]}
            textStyle={{color: Colors.ThemeBlue}}
          />
        </View>
        <Error
          isVisible={errorModal}
          onClose={() => setErrorModal(false)}
          message={'Password is not matched'}
        />
        <CustomLotti
          isVisible={passwordChange}
          source={require('../../assets/lotti/passwordchange.json')}
          Title="Password has been changed"
          TextRestyle={{color: Colors.ThemeBlue}}
        />
        <Loading isVisible={loading} />
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
    marginTop: '15%',
  },
});

export default Reset;
