import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Platform,
  } from 'react-native';
  import React, { useState } from 'react';
  import { Colors } from '../../utils/Colors';
  import { Font } from '../../utils/font';
  import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
  import CustomInput from '../../components/CustomInput';
  import { useForm } from 'react-hook-form';
  import CustomButton from '../../components/CustomButton';
  import PasswordInput from '../../components/PasswordInput';
  import { GlobalStyle } from '../../Constants/GlobalStyle';
  import { launchImageLibrary } from 'react-native-image-picker';
  import Error from '../../components/Modal/Error';
  import { useDispatch } from 'react-redux';
  import { verify_email_before_registration } from '../../redux/actions/AuthActions';
  import Loading from '../../components/Modal/Loading';
  import Toast from 'react-native-simple-toast';
  import ConnectionModal from '../../components/Modal/ConnectionModal';
  import Validation from '../../components/Validation';
  import { EmailRegix, NameRegix } from '../../utils/url';
  import LogoCard from '../../components/Card/LogoCard';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
  
  const SignUp = ({ navigation, route }) => {
    const { social, socialData } = route.params;
    const dispatch = useDispatch();
    const [errorModal, setErrorModal] = useState(false);
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [photoModal, setPhotoModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const OS = Platform.OS;
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({ mode: 'all' });
  
    const [saveImage, setSaveImage] = useState('');

    const requestGalleryPermission = async () => {
        try {
          const status = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          return status === RESULTS.GRANTED;
        } catch (error) {
          console.error('Error requesting gallery permission:', error);
          return false;
        }
      };
      
      const photosave = async () => {
        const galleryPermissionGranted = await requestGalleryPermission();
      
        if (!galleryPermissionGranted) {
          Toast.show('Gallery permission denied');
          return;
        }
      
        let options = {
          storageOptions: {
            mediaType: 'photo',
            path: 'image',
            includeExtra: true,
          },
          selectionLimit: 1,
        };
      
        launchImageLibrary(options, res => {
          if (res.didCancel) {
            Toast.show('You have cancelled Image picker');
          } else if (res.error) {
            console.log('ImagePicker', res.error);
          } else {
            const ele = res.assets?.[0];
            setSaveImage({
              name: ele?.fileName,
              uri: ele?.uri,
              type: ele?.type,
            });
          }
        });
      };
        
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
    //       console.log('ImagePicker', res.error);
    //     } else {
    //       const ele =res.assets?.[0]
    //       setSaveImage({
    //         name: ele?.fileName,
    //         uri: ele?.uri,
    //         type: ele?.type,
    //       });
    //     }
    //   });
    // };
  
    const type = 'signup';
    const onSubmit = data => {
      if (saveImage?.uri) {
        if (social == 'social') {
          navigation.navigate('AccountType', {
            socialData: socialData,
            saveImage: saveImage,
            data: data,
          });
        } else if (data.password == data.confirm_password) {
          dispatch(
            verify_email_before_registration(
              data,
              type,
              navigation,
              saveImage,
              setIsEmailExist,
              setLoading,
              OS,
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
  
    return (
      <View style={GlobalStyle.Container}>
        <ImageBackground
          source={require('../../assets/image/Bacground/signup.png')}
          resizeMode="cover"
          style={GlobalStyle.Container}>
          <ScrollView
              behavior={Platform.OS == 'android' ?  'positon' : 'padding'}
          showsVerticalScrollIndicator={false}>
            <LogoCard />
            <Text style={styles.SignUpText}>Sign Up</Text>
            <TouchableOpacity onPress={() => photosave()} style={styles.ImageBox}>
              <Image
                style={styles.Image}
                source={
                  saveImage
                    ? { uri: saveImage?.uri }
                    : require('../../assets/image/defaultdark.png')
                }
              />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: moderateScale(20) }}>
              <CustomInput
                fontSize={scale(16)}
                FontAwesome
                FontAwesome_Name="user"
                size={scale(20)}
                control={control}
                keyboardType="default"
                name="name"
                defaultValue={social == 'social' ? socialData?.user_name : ''}
                value={social == 'social' ? socialData?.user_name : ''}
                rules={{
                  required: 'User Name is required',
                  value: NameRegix,
                  message: 'Enter a User Name',
                }}
                placeholder="User Name"
              />
              {errors.name && <Validation title={errors.name.message} />}
              <CustomInput
                fontSize={scale(16)}
                MaterialIcons
                MaterialIcons_Name="email"
                size={scale(20)}
                control={control}
                editable={social !== 'social'}
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
                FontAwesome
                FontAwesome_Name="phone"
                size={scale(20)}
                control={control}
                keyboardType="numeric"
                name="phone_number"
                rules={{
                  required: '*Phone Number is required',
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
              {/* <TouchableOpacity
               
                style={styles.ImagePickerBox}>
                <FontAwesome
                  name="user-circle-o"
                  size={scale(23)}
                  color={Colors.White}
                />
                <Text style={styles.Upload}>Uploading image</Text>
                <FontAwesome name="image" size={scale(20)} color={Colors.White} />
              </TouchableOpacity> */}
              <CustomButton
                onPress={handleSubmit(onSubmit)}
                title="Register"
                containerStyle={styles.containerStyle}
                textStyle={{ color: Colors.White, fontSize: scale(23) }}
              />
            </View>
            <View style={{ height: verticalScale(10) }} />
          </ScrollView>
            <Error isVisible={errorModal} message={'Password is not matched'} />
            <Error
              isVisible={isEmailExist}
              message={'This email already exists'}
            />
            <Error isVisible={photoModal} message={'please Upload a Photo'} />
            <Loading isVisible={loading} />
            <ConnectionModal />
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
    ImageBox: {
      width: scale(150),
      aspectRatio: 1 / 1,
      borderRadius: 100,
      alignSelf: 'center',
      borderWidth: scale(1),
      borderColor: Colors.Black,
    },
    Image: { width: '100%', height: '100%', borderRadius: 100 },
  });
  
  export default SignUp;