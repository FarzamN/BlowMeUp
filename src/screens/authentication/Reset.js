import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';

const Reset = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    console.log('asdjkfhaskl')
    navigation.navigate('SignIn')
    if (data != null) {
      if (data.password == data.confirm_password) {
        navigation.navigate('SignIn')
      } else {
        alert('password is not matched')
      }
    } else {
      alert('fill the data')
    }
  }
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="#1E2235" />
      <ImageBackground
        source={require('../../assets/image/Bacground/reset.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Image
          style={{alignSelf: 'center'}}
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
            maxLength={20}
            placeholderTextColor={'#32323266'}
          />
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
            maxLength={20}
            placeholderTextColor={'#32323266'}
          />
          <CustomButton
            // onPress={() => alert('jbdfjkb')}
            onPress={() => handleSubmit(onSubmit)}
            title="Confirm"
            containerStyle={styles.containerStyle}
            textStyle={{color: Colors.ThemeBlue}}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    marginTop: '15%',
    width: '85%',
    marginLeft: scale(10),
  },
});

export default Reset;
