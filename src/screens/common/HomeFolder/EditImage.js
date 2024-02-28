import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Edit_Image, Edit_Video} from '../../../redux/actions/UserAction';
import Loading from '../../../components/Modal/Loading';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import MainHeader from '../../../components/Header/MainHeader';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {scale, verticalScale} from 'react-native-size-matters';
import Validation from '../../../components/Validation';
import UploadHeader from '../../../components/Header/UploadHeader';
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';
import {Font} from '../../../utils/font';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Height = Dimensions.get('window').height;
const EditImage = ({navigation, route}) => {
  const {Values} = route.params;
  console.log('data in edit image screen ==>', Values);
  const [load, setLoad] = useState(false);
  const [saveImage, setsaveImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const requestMediaPermissions = async () => {
    try {
      const galleryStatus = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
      const cameraStatus = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
      );
  
      return galleryStatus === RESULTS.GRANTED && cameraStatus === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  const UploadImage = async () => {
    const permissionsGranted = await requestMediaPermissions();
  
    if (!permissionsGranted) {
      Toast.show('Gallery and/or Camera permissions denied');
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
        Toast.show('Image picker is canceled');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        const ImageSource = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        };
        setsaveImage(ImageSource);
      }
    });
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    Edit_Image(setLoad, data, Values, saveImage, navigation);
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        NoSearch
        BackArrow
        Title
        Text="Edit Your Images"
        TextRestyle={GlobalStyle.HeaderSmallText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopContainer}>
          <Text style={GlobalStyle.UploadTitle}>
            Update Caption of the Image
          </Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="Title of the video"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            defaultValue={Values.caption}
            value={Values.caption}
            rules={{
              required: '*Title is required',
            }}
          />
          {errors.title && <Validation title={errors.title.message} />}
          <View style={styles.Container}>
            <View style={[GlobalStyle.UploadImageBox, {height: Height * 0.35}]}>
            {isLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size="large"
            color={Colors.Main}
          />
        )}
              <Image
               onLoadEnd={() => setIsLoading(false)}
                style={[GlobalStyle.Image, {borderRadius: scale(15)}]}
                source={{uri: saveImage ? saveImage.uri : Values.image}}
              />
            </View>
            <View style={styles.Container}>
              <UploadHeader
                title={'Picture'}
                source={require('../../../assets/image/photo.png')}
              />
              <CustomButton
                onPress={UploadImage}
                containerStyle={GlobalStyle.UploadBtnStyle}
                textStyle={GlobalStyle.UploadBtnTextStyle}
                title={
                  saveImage ? 'New picture is Selected' : 'Select a new Picture'
                }
                selected={saveImage ? true : false}
              />
            </View>
          </View>
          <CustomButton
            title="Upload"
            containerStyle={GlobalStyle.CustomButtonRestyle}
            textStyle={{color: Colors.White}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      <Loading isVisible={load} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  TopContainer: {
    marginHorizontal: scale(20),
    marginVertical: verticalScale(10),
  },
  Container: {
    marginTop: verticalScale(30),
  },
});

export default EditImage;
