import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PasswordInput from '../../components/PasswordInput';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import Success from '../../components/Modal/Success';
import Error from '../../components/Modal/Error';
import {useDispatch} from 'react-redux';
import {verify_email_before_registration} from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';
import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Validation from '../../components/Validation';
import ImagePicker from 'react-native-image-crop-picker';
import { EmailRegix } from '../../utils/url';

const SignUp = ({navigation, route}) => {
  const {social, socialData} = route.params;
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('socialData', socialData);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const [saveimage, setsaveimage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // const photosave = () => {
  //   let options = {
  //     storageOptions: {
  //       mediaType: 'photo',
  //       path: 'image',
  //       includeExtra: true,
  //     },
  //     selectionLimit: 1,
  //   };

  //   launchImageLibrary(options, res => {
  //     if (res.didCancel) {
  //       Toast.show('You have cancelled Image picker');
  //     } else if (res.error) {
  //       console.log('ImagePicker',res.error);
  //     }  else {
  //       setsaveimage({
  //         name: res.assets?.[0]?.fileName,
  //         uri: res.assets?.[0]?.uri,
  //         type: res.assets?.[0]?.type,
  //       });
  //     }
  //   });
  // };

  const photosave = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('image ==>',image);
      setsaveimage({
        uri: image.path,
        type: image.mime
      });
    });
  };
  
  console.log('saveimage', saveimage)

  const type = 'signup';
  const onSubmit = data => {
    if (saveimage?.uri) {
      if (social == 'social') {
        navigation.navigate('AccountType', {
          socialData: socialData,
          saveimage: saveimage,
          data: data,
        });
      } else if (data.password == data.confirm_password) {
        dispatch(
          verify_email_before_registration(
            data,
            type,
            setSuccessModal,
            navigation,
            saveimage,
            setIsEmailExist,
            setLoading,
          ),
        );
      } else {
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 2000);
      }
    } else {
      setPhotoModal(true);
      setTimeout(() => {
        setPhotoModal(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={GlobalStyle.Container}>
      <ImageBackground
        source={require('../../assets/image/Bacground/signup.png')}
        resizeMode="cover"
        style={GlobalStyle.Container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={{alignSelf: 'center', marginTop: '12%'}}
            source={require('../../assets/image/logo.png')}
          />
          <Text style={styles.SignUpText}>Sign Up</Text>
          <View
            style={styles.ImageBox}>
            <Image
              style={styles.Image}
              source={
                saveimage
                  ? {uri: saveimage?.uri}
                  : require('../../assets/image/defaultdark.png')
              }
            />
          </View>
          <View style={{paddingHorizontal: moderateScale(20)}}>
            <CustomInput
              fontSize={scale(16)}
              FontAwesome={true}
              FontAwesome_Name="user"
              size={scale(20)}
              control={control}
              keyboardType="default"
              name="name"
              defaultValue={social == 'social' ? socialData?.user_name : ''}
              value={social == 'social' ? socialData?.user_name : ''}
              rules={{
                required: 'User Name is required',
                value: EmailRegix,
                message: 'Enter a User Name',
              }}
              placeholder="User Name"
            />
            {errors.name && <Validation title={errors.name.message} />}
            <CustomInput
              fontSize={scale(16)}
              MaterialIcons={true}
              MaterialIcons_Name="email"
              size={scale(20)}
              control={control}
              defaultValue={social == 'social' ? socialData?.email : ''}
              value={social == 'social' ? socialData?.email : ''}
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
            />
            {errors.email && <Validation title={errors.email.message} />}
            <CustomInput
              FontAwesome={true}
              FontAwesome_Name="phone"
              size={scale(20)}
              control={control}
              keyboardType="numeric"
              name="phone_number"
              rules={{
                required: '*Password is required',
                minLength: {
                  value: 10,
                  message: '*Phone Number is not valid',
                },
                maxLength: {
                  value: 16,
                  message: '*Phone Number is not valid',
                },
              }}
              placeholder="Phone Number"
              fontSize={scale(16)}
            />
            {errors.phone_number && (
              <Validation title={errors.phone_number.message} />
            )}

            {social == 'social' ? null : (
              <>
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
                  placeholder="Password"
                  placeholderTextColor={'#32323266'}
                  fontSize={scale(16)}
                />
                {errors.password && (
                  <Validation title={errors.password.message} />
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
                  fontSize={scale(16)}
                  placeholderTextColor={'#32323266'}
                />
                {errors.confirm_password && (
                  <Validation title={errors.confirm_password.message} />
                )}
              </>
            )}
            <TouchableOpacity
              onPress={() => photosave()}
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
              onPress={handleSubmit(onSubmit)}
              title="Register"
              containerStyle={styles.containerStyle}
              textStyle={{color: Colors.White, fontSize: scale(23)}}
            />
          </View>
          <Success isVisible={successModal} />
          <Error isVisible={errorModal} message={'Password is not matched'} />
          <Error
            isVisible={isEmailExist}
            message={'This email already exists'}
          />
          <Error isVisible={photoModal} message={'please Upload a Photo'} />
          <Loading isVisible={loading} />
          <View style={{height: verticalScale(10)}} />
          <ConnectionModal isVisible={!isConnected} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
  ImageBox:{
    width: scale(150),
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: scale(1),
    borderColor: Colors.Black,
  },
  Image:{width: '100%', height: '100%', borderRadius: 100}
});

export default SignUp;
