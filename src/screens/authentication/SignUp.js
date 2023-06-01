import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SignUp = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  return (
    <SafeAreaView style={styles.Container}>
      <ImageBackground
        source={require('../../assets/image/Bacground/signup.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/image/logo.png')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.SignUpText}>Sign Up</Text>
          <View style={{paddingHorizontal: moderateScale(20)}}>
            <CustomInput
              fontSize={scale(16)}
              FontAwesome={true}
              FontAwesome_Name="user"
              size={scale(20)}
              control={control}
              keyboardType="default"
              name="name"
              rules={{
                required: 'User Name is required',
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a User Name',
              }}
              placeholder="User Name"
            />
            <CustomInput
              fontSize={scale(16)}
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
            <CustomInput
              FontAwesome={true}
              FontAwesome_Name="phone"
              size={scale(20)}
              control={control}
              keyboardType="numeric"
              name="phone_number"
              rules={{
                required: 'phone_number is required',
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a valid phone number',
              }}
              placeholder="Phone Number"
              fontSize={scale(16)}
            />
            <CustomInput
              fontSize={scale(16)}
              Fontisto={true}
              Fontisto_Name="unlocked"
              size={scale(20)}
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
              secureTextEntry={true}
              keyboardType="default"
              placeholder="Password"
              maxLength={20}
              placeholderTextColor={'#32323266'}
            />
            <CustomInput
              fontSize={scale(16)}
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
            <TouchableOpacity
            //  onPress={select}
            style={styles.ImagePickerBox}>
              <FontAwesome
                name="user-circle-o"
                size={scale(23)}
                color={Colors.White}
              />
              <Text style={styles.Upload}>Uploading image</Text>
              <FontAwesome name="image" size={scale(20)} color={Colors.White} />
            </TouchableOpacity>
            <CustomButton
              onPress={() => navigation.navigate('OTP',{type: 'register'})}
              title="Register"
              containerStyle={styles.containerStyle}
              textStyle={{color: Colors.White, fontSize: scale(23)}}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  SignUpText: {
    textAlign: 'center',
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(30),
    marginVertical: verticalScale(20),
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderColor: Colors.White,
    borderRadius: scale(30),
    marginTop: '15%',
    width: '85%',
    height: verticalScale(50),
  },
  ImagePickerBox: {
    borderWidth: scale(1),
    borderRadius: scale(25),
    borderColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    height: verticalScale(55),
  },
  Upload: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(16),
  },
});

export default SignUp;
