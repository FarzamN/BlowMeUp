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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Image_BaseUrl} from '../../../utils/url';

import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {Update_profile} from '../../../redux/actions/UserAction';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Profile = ({navigation}) => {
  const userDetails = useSelector(state => state.userDetails);
  console.log('userDetails ==>', userDetails);
  const dispatch = useDispatch();

  const [saveimage, setsaveimage] = useState();
  const [show, setShow] = useState(true);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showForName, setShowForName] = useState(false);


  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );

  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

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
        toggleModal3();
      } else {
        console.log('Camera permission denied');
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
        console.log('=====> camera');
      } else if (res.error) {
        console.log('====> imagePicker');
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        setsaveimage({
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
        setsaveimage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        });
        setShow(false);
      }
    });
  };

  const onSubmit = data => {
    // console.log('data change of edit', data);
    dispatch(Update_profile(data, userDetails, saveimage, setActiveLoading));
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
        <>
          <TouchableOpacity disabled={!edit ? true : false}  onPress={toggleModal3}>
            {show ? (
              <Image
                resizeMode="contain"
                style={styles.circle}
                source={{uri: Image_BaseUrl + userDetails.profile_image}}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={styles.circle}
                source={{uri: saveimage.uri}}
              />
            )}
          </TouchableOpacity>

          <Modal
            backdropOpacity={0.3}
            onBackdropPress={() => setModalVisible3(false)}
            isVisible={isModalVisible3}
            style={{
              width: '100%',
              margin: 0,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible3(false)}
                style={styles.CrossBOx}>
                <Entypo name="cross" size={scale(25)} color={Colors.White} />
              </TouchableOpacity>

              <View style={styles.SecCon}>
                <TouchableOpacity
                  onPress={() => {
                    photosave();
                    toggleModal3();
                  }}
                  style={styles.ModalBtn}>
                  <MaterialIcons
                    // style={styles.tinyLogo}
                    name="photo"
                    size={scale(32)}
                    color={Colors.Main}
                  />
                  <Text style={styles.Text1}>Upload picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    cameraLaunch();
                    toggleModal3();
                  }}
                  style={styles.ModalBtn}>
                  <Entypo name="camera" size={scale(30)} color={Colors.Main} />
                  <Text style={styles.Text1}>Take a picture</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
        <View
          style={[
            GlobalStyle.Row,
            {justifyContent: 'center', marginTop: verticalScale(10)},
          ]}>
          <Text style={styles.Name}>{userDetails.userName}</Text>
        </View>

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <FontAwesome5
              name="user-alt"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput == true ? (
              <CustomInput
                Hello={styles.CustomInputRestyle}
                Gapp={styles.Gapp}
                control={control}
                keyboardType="default"
                name="name"
                placeholder="Enter Your Name"
                defaultValue={userDetails.userName}
                value={userDetails.userName}
              />
            ) : (
              <Text style={styles.Text}>{userDetails.userName}</Text>
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
              <CustomInput
                Hello={styles.CustomInputRestyle}
                Gapp={styles.Gapp}
                control={control}
                keyboardType="email-address"
                name="email"
                placeholder="Enter Your Email"
                defaultValue={userDetails.email}
                value={userDetails.email}
              />
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
              <CustomInput
                Hello={styles.CustomInputRestyle}
                Gapp={styles.Gapp}
                control={control}
                keyboardType="number-pad"
                name="phone"
                placeholder="Enter Phone Number"
                defaultValue={userDetails.phone}
                value={userDetails.phone}
              />
            ) : (
              <Text style={styles.Text}>{userDetails.phone}</Text>
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

        {/* <Modal isVisible={activeLoading} style={GlobalStyle.MainModal}>
          <ActivityIndicator size={scale(50)} color={Colors.White} />
        </Modal> */}
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
  Text1: {
    fontSize: scale(11),
    fontFamily: Font.Gilroy700,
    color: Colors.placeholderTextColor,
  },
  ModalBtn: {
    flex: 1,
    margin: verticalScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
  },
  SecCon: {
    paddingVertical: moderateScale(15),
    width: '100%',
    backgroundColor: Colors.ThemeBlue,
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    flexDirection: 'row',
  },
  tinyLogo: {
    height: verticalScale(50),
    width: scale(50),
    resizeMode: 'contain',
  },
  CrossBOx: {
    backgroundColor: Colors.Main,
    width: scale(25),
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: verticalScale(-10),
    zIndex: 9,
    aspectRatio: 1 / 1,
  },
});
export default Profile;
