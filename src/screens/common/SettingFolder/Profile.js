import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePickerModal from '../../../components/Modal/ImagePickerModal';
import {EmailRegix, NameRegix} from '../../../utils/url';
import Validation from '../../../components/Validation';
import { Edit_profile } from '../../../redux/actions/UserAction';
import ReactNativeModal from 'react-native-modal';
import Loading from '../../../components/Modal/Loading';
const Profile = ({navigation}) => {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();

  const [saveImage, setSaveImage] = useState();
  const [show, setShow] = useState(true);
  const [pickerModal, setPickerModal] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);

  const togglePickerModal = () => {
    setPickerModal(!pickerModal);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'App Gallery Permission',
          message: 'App needs access to your gallery ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        togglePickerModal();
      } else {
        Toast.showWithGravity('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const photosave = () => {
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
        Toast.show('Picker is Canceled');
      } else if (res.error) {
        console.log('====> imagePicker');
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        setSaveImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        });
        setShow(false);
      }
    });
  };
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setSaveImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        });
        setShow(false);
      }
    });
  };

  const onSubmit = data => {
    dispatch(Edit_profile(data, saveImage, setActiveLoading));
    setEdit(!edit);
    setShowInput(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        edit={true}
        BackArrow={true}
        Title={true}
        Text={!edit ? 'Profile' : 'Edit Profile'}
        editText={!edit ? 'Edit' : 'Cancel'}
        editOnPress={() => {
          setEdit(!edit);
          setShowInput(false);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          disabled={!edit ? true : false}
          onPress={() => setPickerModal(true)}>
          {show ? (
            <Image
              resizeMode="contain"
              style={styles.circle}
              source={{uri: userDetails.image}}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={styles.circle}
              source={{uri: saveImage.uri}}
            />
          )}
        </TouchableOpacity>

        <View
          style={[
            GlobalStyle.Row,
            {justifyContent: 'center', marginTop: verticalScale(10)},
          ]}>
          <Text style={styles.Name}>{userDetails.name}</Text>
        </View>

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <FontAwesome5
              name="user-alt"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput == true ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  keyboardType="default"
                  name="name"
                  placeholder="Enter Your Name"
                  defaultValue={userDetails.name}
                  value={userDetails.name}
                  rules={{
                    required: 'User Name is required',
                    value: NameRegix,
                    message: 'Enter a User Name',
                  }}
                />
                {errors.name && <Validation title={errors.name.message} />}
              </>
            ) : (
              <Text style={styles.Text}>{userDetails.name}</Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <Zocial name="email" size={scale(20)} color={Colors.White} />
            {showInput == true ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  keyboardType="email-address"
                  name="email"
                  placeholder="Enter Your Email"
                  defaultValue={userDetails.email}
                  value={userDetails.email}
                  rules={{
                    required: '*Email is required',
                    pattern: {
                      value: EmailRegix,
                      message: 'Email is not valid',
                    },
                  }}
                />
                {errors.email && <Validation title={errors.email.message} />}
              </>
            ) : (
              <Text style={styles.Text}>{userDetails.email}</Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <FontAwesome5
              name="phone-alt"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput == true ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  keyboardType="number-pad"
                  name="phone"
                  placeholder="Enter Phone Number"
                  defaultValue={userDetails.phone_number}
                  value={userDetails.phone_number}
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
                />
                {errors.phone && <Validation title={errors.phone.message} />}
              </>
            ) : (
              <Text style={styles.Text}>{userDetails.phone_number}</Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>
        {!edit ? null : (
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            title="Save Changes"
            containerStyle={{
              marginTop: verticalScale(40),
              height: verticalScale(60),
            }}
          />
        )}
        <View style={{height: verticalScale(10)}} />

        {/* <ReactNativeModal isVisible={activeLoading} style={GlobalStyle.MainModal}>
          <ActivityIndicator size={scale(50)} color={Colors.White} />
        </ReactNativeModal> */}
        <Loading  isVisible={activeLoading}/>
        <ImagePickerModal
          isVisible={pickerModal}
          onClose={togglePickerModal}
          PressPicture={() => {
            photosave();
            togglePickerModal();
          }}
          PressCamera={() => {
            cameraLaunch();
            togglePickerModal();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(100),
  },
  ImageBox: {
    width: scale(130),
    aspectRatio: 1 / 1,
    borderRadius: scale(100),
    alignSelf: 'center',
    borderWidth: scale(2),
    borderColor: '#4F5565',
  },
  Name: {
    color: Colors.White,
    fontFamily: Font.Poppins600,
    fontSize: scale(20),
    paddingRight: scale(10),
    top: verticalScale(3),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(14),
    marginLeft: scale(20),
    marginRight: scale(10),
  },
  margins: {
    marginTop: verticalScale(40),
    marginLeft: scale(20),
    marginRight: scale(60),
  },
  CustomInputRestyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.White,
    borderRadius: 0,
    width: '90%',
    marginTop: verticalScale(-10),
    marginLeft: scale(15),
    paddingHorizontal: 0,
    height: verticalScale(40),
  },
  Gapp: {
    paddingHorizontal: moderateScale(5),
  },
  circle: {
    width: scale(110),
    height: scale(110),
    backgroundColor: Colors.White,
    borderRadius: scale(100),
    alignSelf: 'center',
  },
});
export default Profile;
