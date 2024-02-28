import React, { useCallback, useState, useRef } from 'react';
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
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Font } from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import { useForm } from 'react-hook-form';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerModal from '../../../components/Modal/ImagePickerModal';
import { EmailRegix, NameRegix, facebook_rigix, instagram_rigix, x_rigix, youtube_rigix } from '../../../utils/url';
import Validation from '../../../components/Validation';
import { Edit_profile } from '../../../redux/actions/UserAction';
import Loading from '../../../components/Modal/Loading';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import ImageViewModal from '../../../components/Modal/ImageViewModal';

const Profile = ({ navigation }) => {
  const userDetails = useSelector(state => state.userDetails);

  const dispatch = useDispatch();

  const [isDpViewVisible, setIsDpViewVisible] = useState(false);
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
    formState: { errors },
  } = useForm({ mode: 'all' });

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
    dispatch(
      Edit_profile(data, saveImage, setActiveLoading, setEdit, setShowInput),
    );
  };
  const ImagePress = () => {
    if (!edit) {
      setIsDpViewVisible(true)
    } else {
      setPickerModal(true)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        NoSearch
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
          onPress={ImagePress}>
          <Image
            resizeMode="contain"
            style={styles.circle}
            source={show ? { uri: userDetails.image } : { uri: saveImage.uri }}
          />
        </TouchableOpacity>

        <View
          style={[
            GlobalStyle.Row,
            { justifyContent: 'center', marginTop: verticalScale(10) },
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
            {showInput ? (
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
                    pattern: {
                      value: NameRegix,
                      message: 'Enter a User Name',
                    },
                  }}
                />

              </>
            ) : (
              <Text style={styles.Text}>{userDetails.name}</Text>
            )}
          </View>
          {!showInput ? (
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
        {edit && errors.name && <Validation space title={errors.name.message} />}

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <Zocial name="email" size={scale(20)} color={Colors.White} />
            {showInput ? (
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
              </>
            ) : (
              <Text style={styles.Text}>{userDetails.email}</Text>
            )}
          </View>
          {showInput == false && (
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
          )}
        </View>
        {edit && errors.email && <Validation space title={errors.email.message} />}

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <FontAwesome5
              name="phone-alt"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput ? (
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
                />
              </>
            ) : (
              <Text style={styles.Text}>{userDetails.phone_number}</Text>
            )}
          </View>
          {!showInput ? (
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
        {edit && errors.phone && <Validation space title={errors.phone.message} />}

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <AntDesign
              name="instagram"
              size={scale(22)}
              color={Colors.White}
            />
            {showInput ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  name="instagram"
                  placeholder="Enter Your Instagram"
                  defaultValue={userDetails.instagram}
                  value={userDetails.instagram}
                  rules={{
                    required: false,
                    pattern: {
                      value: instagram_rigix,
                      message: 'Enter a valid Instagram link',
                    },
                  }}
                />
              </>
            ) : (
              <Text style={styles.Text}>{userDetails?.instagram ? userDetails?.instagram : 'please add your instagram'}</Text>

            )}
          </View>
          {!showInput ? (
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
        {edit && errors.instagram && <Validation space title={errors.instagram.message} />}
        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <Entypo
              name="facebook"
              size={scale(22)}
              color={Colors.White}
            />
            {showInput ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  name="facebook"
                  placeholder="Enter Your Facebook"
                  defaultValue={userDetails.facebook}
                  value={userDetails.facebook}
                  rules={{
                    required: false,
                    pattern: {
                      value: facebook_rigix,
                      message: 'Enter a valid facebook link',
                    },
                  }}
                />
                <Validation title={'errors.facebook.message'} />
              </>
            ) : (
              <Text style={styles.Text}>{userDetails?.facebook ? userDetails?.facebook : 'please add your facebook'}</Text>
            )}
          </View>
          {!showInput ? (
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
        {edit && errors.facebook && <Validation space title={errors.facebook.message} />}
        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <Entypo
              name="youtube"
              size={scale(22)}
              color={Colors.White}
            />
            {showInput ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  name="youtube"
                  placeholder="Enter Your Youtube Profile"
                  defaultValue={userDetails.youtube}
                  value={userDetails.youtube}
                  rules={{
                    required: false,
                    pattern: {
                      value: youtube_rigix,
                      message: 'Enter a valid Youtube',
                    },
                  }}
                />
              </>
            ) : (
              <Text style={styles.Text}>{userDetails?.youtube ? userDetails?.youtube : 'please add your youtube'}</Text>
            )}
          </View>
          {!showInput ? (
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
        {edit && errors.youtube && <Validation space title={errors.youtube.message} />}

        <View style={[GlobalStyle.Row, styles.margins]}>
          <View style={GlobalStyle.Row}>
            <Entypo
              name="twitter"
              size={scale(22)}
              color={Colors.White}
            />
            {showInput ? (
              <>
                <CustomInput
                  Hello={styles.CustomInputRestyle}
                  Gapp={styles.Gapp}
                  control={control}
                  name="twitter"
                  placeholder="Enter Your Twitter's Profile"
                  defaultValue={userDetails.twitter}
                  value={userDetails.twitter}
                  rules={{
                    required: false,
                    pattern: {
                      value: x_rigix,
                      message: "Enter a twitter's link",
                    },
                  }}
                />
              </>
            ) : (
              <Text style={styles.Text}>{userDetails?.twitter ? userDetails?.twitter : 'please add your twitter'}</Text>
            )}
          </View>
          {!showInput ? (
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
        {edit && errors.twitter && <Validation space title={errors.twitter.message} />}

        {!edit ? null : (
          <CustomButton
            onPress={handleSubmit( onSubmit)}
            title="Save Changes"
            containerStyle={{
              marginTop: verticalScale(40),
              height: verticalScale(60),
            }}
          />
        )}
        <View style={{ height: verticalScale(10) }} />

      </ScrollView>
      <Loading isVisible={activeLoading} />
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
      <ConnectionModal />
      <ImageViewModal
        images={show ? userDetails.image : saveImage.uri}
        isVisible={isDpViewVisible}
        onClose={() => setIsDpViewVisible(false)}
      />
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
