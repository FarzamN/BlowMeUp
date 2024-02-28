import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useForm } from 'react-hook-form';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import { scale, verticalScale } from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import Error from '../../components/Modal/Error';
import { verify_email_before_password } from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';
import { useDispatch } from 'react-redux';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Validation from '../../components/Validation';
import LogoCard from '../../components/Card/LogoCard';
import { EmailRegix } from '../../utils/url';

const FindAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isEmailExist, setIsEmailExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const type = 'forgot';
  const onSubmit = data => {
    dispatch(
      verify_email_before_password(
        data,
        type,
        navigation,
        setIsEmailExist,
        setLoading,
      ),
    );
  };

  return (
    <View style={GlobalStyle.Container}>
      <ImageBackground
        source={require('../../assets/image/Bacground/find.png')}
        resizeMode="cover"
        style={GlobalStyle.Container}>
        <LogoCard />
        <View style={styles.MainBox}>
          <Text style={styles.Find}>Find Your Account</Text>
          <Text style={styles.Search}>
            Please enter your email address to search for your account.
          </Text>
          <CustomInput
            MaterialIcons
            MaterialIcons_Name="email"
            size={scale(21)}
            control={control}
            keyboardType="email-address"
            name="email"
            rules={{
              required: '*Email is required',
              pattern: {
                value: EmailRegix,
                message: 'Email is not valid',
              },
            }}
            placeholder="Email Address"
            fontSize={scale(16)}
          />
          {errors.email && <Validation title={errors.email.message} />}
          <View style={[styles.Row, { justifyContent: 'flex-end' }]}>
            <CustomButton
              onPress={() => navigation.navigate('SignIn')}
              title="Cancel"
              containerStyle={[
                GlobalStyle.CustomButtonRestyle,
                styles.containerStyle,
              ]}
              textStyle={{ color: Colors.ThemeBlue, fontSize: scale(14) }}
            />
            <CustomButton
              onPress={handleSubmit(onSubmit)}
              title="Search"
              containerStyle={[
                GlobalStyle.CustomButtonRestyle,
                styles.containerStyle,
              ]}
              textStyle={{ color: Colors.ThemeBlue, fontSize: scale(13) }}
            />
          </View>
        </View>

        <Error
          isVisible={isEmailExist}
          message={'This email does not exists'}
        />
        <Loading isVisible={loading} />
        <ConnectionModal />
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
