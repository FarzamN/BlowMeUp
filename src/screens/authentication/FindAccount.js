import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const FindAccount = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="#212939" />
      <ImageBackground
        source={require('../../assets/image/Bacground/find.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/image/logo.png')}
        />
        <View style={styles.MainBox}>
          <Text style={styles.Find}>Find Your Account</Text>
          <Text style={styles.Search}>
            Please enter your email address to search for your account.
          </Text>
          <CustomInput
            MaterialIcons={true}
            MaterialIcons_Name="email"
            size={scale(20)}
            control={control}
            keyboardType="email-address"
            name="email"
            rules={{
              required: 'email is required',
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Enter a valid email',
            }}
            placeholder="Email Address"
          />
          <View style={[styles.Row, {justifyContent: 'flex-end'}]}>
            <CustomButton
              onPress={() => navigation.navigate('SignIn')}
              title="Cancel"
              containerStyle={styles.containerStyle}
              textStyle={{color: Colors.ThemeBlue, fontSize: scale(14)}}
            />
            <CustomButton
              onPress={() => navigation.navigate('OTP',{type: 'forgot'})}
              title="Search"
              containerStyle={styles.containerStyle}
              textStyle={{color: Colors.ThemeBlue, fontSize: scale(13)}} 
            />
          </View>
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
    marginTop: verticalScale(30),
    width: '30%',
    height: verticalScale(40),
    marginLeft: scale(10),
  },
});
export default FindAccount;
