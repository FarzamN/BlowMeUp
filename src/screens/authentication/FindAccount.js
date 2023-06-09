import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';
import {verify_email_before_password} from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';

const FindAccount = ({navigation}) => {
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_id,setUser_id] = useState('')

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const onSubmit = data => {
      verify_email_before_password(
        data,
        setSuccessModal,
        navigation,
        setIsEmailExist,
        user_id,
        setUser_id,
        setLoading
        );
  };
  return (
      <View style={GlobalStyle.Container}>
        <ImageBackground
          source={require('../../assets/image/Bacground/find.png')}
          resizeMode="cover"
          style={GlobalStyle.Container}>
          <Image
            style={{alignSelf: 'center', marginTop: '12%'}}
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
              size={scale(21)}
              control={control}
              keyboardType="email-address"
              name="email"
              rules={{
                required: '*Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email is not valid',
                },
              }}
              placeholder="Email Address"
              fontSize={scale(16)}
            />
            {errors.email && (
              <Text style={GlobalStyle.error}>{errors.email.message}</Text>
            )}
            <View style={[styles.Row, {justifyContent: 'flex-end'}]}>
              <CustomButton
                onPress={() => navigation.navigate('SignIn')}
                title="Cancel"
                containerStyle={[
                  GlobalStyle.CustomButtonRestyle,
                  styles.containerStyle,
                ]}
                textStyle={{color: Colors.ThemeBlue, fontSize: scale(14)}}
              />
              <CustomButton
                onPress={handleSubmit(onSubmit)}
                title="Search"
                containerStyle={[
                  GlobalStyle.CustomButtonRestyle,
                  styles.containerStyle,
                ]}
                textStyle={{color: Colors.ThemeBlue, fontSize: scale(13)}}
              />
            </View>
          </View>
          <Success
            isVisible={successModal}
            onClose={() => setSuccessModal(false)}
            message={'Thanks for your Email'}
          />
          {/* <Error isVisible={errorModal} message={isEmailExistMessage} /> */}
          <Error isVisible={isEmailExist} message={'This email does not exists'} />
          <Loading isVisible={loading}/>
          
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
    width: '30%',
    height: verticalScale(40),
    marginLeft: scale(10),
  },
});
export default FindAccount;
