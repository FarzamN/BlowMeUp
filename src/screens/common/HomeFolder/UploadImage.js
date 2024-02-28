import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Validation from '../../../components/Validation';
import {useForm} from 'react-hook-form';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import CustomInput from '../../../components/CustomInput';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import {upload_Image} from '../../../redux/actions/UserAction';
import {Colors} from '../../../utils/Colors';
import UploadHeader from '../../../components/Header/UploadHeader';
import {Font} from '../../../utils/font';
import ImagePickerModal from '../../../components/Modal/ImagePickerModal';
import Toast from 'react-native-simple-toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Success from '../../../components/Modal/Success';
import Loading from '../../../components/Modal/Loading';
import Error from '../../../components/Modal/Error';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Height = Dimensions.get('window').height;

const UploadImage = ({setSelect}) => {
  const [Picker, setPicker] = useState(false);
  const [saveImage, setSaveImage] = useState();
  const [SelectImage, setSelectImage] = useState(false);
  const [Load, setLoad] = useState(false);
  const [Done, setDone] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const togglePicker = () => {
    setPicker(!Picker);
  };

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
  
  const photosave = async () => {
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
        Toast.show('Picker is Canceled');
      } else if (res.error) {
        console.log('====> imagePicker');
      } else {
        setSaveImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        });
        togglePicker();
      }
    });
  };
  
  const cameraLaunch = async () => {
    const cameraPermissionGranted = await requestMediaPermissions();
  
    if (!cameraPermissionGranted) {
      Toast.show('Camera permission denied');
      return;
    }
  
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        Toast.show('Camera is Canceled');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setSaveImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        });
        togglePicker();
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
  //       Toast.show('Picker is Canceled');
  //     } else if (res.error) {
  //       console.log('====> imagePicker');
  //     } else {
  //       setSaveImage({
  //         name: res.assets?.[0]?.fileName,
  //         uri: res.assets?.[0]?.uri,
  //         type: res.assets?.[0]?.type,
  //       });
  //       togglePicker();
  //     }
  //   });
  // };
  // const cameraLaunch = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   launchCamera(options, res => {
  //     console.log('Response = ', res);
  //     if (res.didCancel) {
  //       Toast.show('Camera is Canceled');
  //     } else if (res.error) {
  //       console.log('ImagePicker Error: ', res.error);
  //     } else {
  //       setSaveImage({
  //         name: res.assets?.[0]?.fileName,
  //         uri: res.assets?.[0]?.uri,
  //         type: res.assets?.[0]?.type,
  //       });
  //       togglePicker();
  //     }
  //   });
  // };

  const onSubmit = data => {
    if (saveImage == null) {
      setSelectImage(true);
      setTimeout(() => {
        setSelectImage(false);
      }, 2000);
    } else {
      upload_Image(data, saveImage, setDone, setLoad, setSelect);
      Toast.show('Please Wait...');
    }
  };
  return (
    <View style={GlobalStyle.Upload_Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={GlobalStyle.UploadTitle}>Caption for the image</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="What is on your mind"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            rules={{
              required: '*Title is required',
            }}
          />
          {errors.title && <Validation title={errors.title.message} />}
        </View>
        <View style={styles.Container}>
        <View style={[GlobalStyle.UploadImageBox,{ height: Height * 0.35,}]}>
            {saveImage ? (
              <Image
                style={[GlobalStyle.Image, {borderRadius: scale(15)}]}
                source={{uri: saveImage.uri}}
              />
            ) : (
              <Text style={GlobalStyle.UploadImagePrev}>
                Select Image To Preview here
              </Text>
            )}
          </View>
          <View style={styles.Container}>
            <UploadHeader
              title={'Picture'}
              source={require('../../../assets/image/photo.png')}
            />
            <CustomButton
              onPress={togglePicker}
              containerStyle={GlobalStyle.UploadBtnStyle}
              textStyle={GlobalStyle.UploadBtnTextStyle}
              title={saveImage ? 'Picture is Selected' : 'Tap to select a Picture'}
              selected={saveImage}
            />
          </View>
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          containerStyle={GlobalStyle.CustomButtonRestyle}
          textStyle={{color: Colors.White}}
          title="Upload"
        />
        <View style={{height: verticalScale(120)}} />
      </ScrollView>
      <ImagePickerModal
        isVisible={Picker}
        onClose={togglePicker}
        PressCamera={cameraLaunch}
        PressPicture={photosave}
      />
      <Success isVisible={Done} message={'Your Image has been uploaded'} />
      <Loading isVisible={Load} />
      <Error isVisible={SelectImage} message={'Please select an Image'} />
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(30),
  },
});

export default UploadImage;
