import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import {SelectList} from 'react-native-dropdown-select-list';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Validation from '../../../components/Validation';
import {create_Video} from '../../../redux/actions/UserAction';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import UploadHeader from '../../../components/Header/UploadHeader';
import Error from '../../../components/Modal/Error';
import Success from '../../../components/Modal/Success';
import Loading from '../../../components/Modal/Loading';
import {VideoData} from '../../../Constants/ArrayOfObject';
const Height = Dimensions.get('window').height;
const Upload = ({select, setSelect}) => {
  const [type, setType] = useState();
  const [saveVideo, setsaveVideo] = useState();
  const [saveImage, setsaveImage] = useState();
  const [SelectImage, setSelectImage] = useState(false);
  const [SelectVideo, setSelectVideo] = useState(false);
  const [SelectType, setSelectType] = useState(false);
  const [Done, setDone] = useState(false);
  const [Load, setLoad] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const UploadVideo = () => {
    const options = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Toast.show('Select a video to upload');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else {
        const ele = response.assets?.[0]
        const VideoSource = {
          name: ele?.fileName,
          uri: ele?.uri,
          type: ele?.type,
        };
        setsaveVideo(VideoSource);
      }
    });
  };

  const UploadImage = () => {
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
        const ele = res.assets?.[0]
        const ImageSource = {
          name: ele?.fileName,
          uri: ele?.uri,
          type: ele?.type,
        };
        setsaveImage(ImageSource);
      }
    });
  };

  const onSubmit = data => {
    if (saveImage == null) {
      setSelectImage(true);
      setTimeout(() => {
        setSelectImage(false);
      }, 2000);
    } else if (saveVideo == null) {
      setSelectVideo(true);
      setTimeout(() => {
        setSelectVideo(false);
      }, 2000);
    } else if (type == null) {
      setSelectType(true);
      setTimeout(() => {
        setSelectType(false);
      }, 2000);
    } else {
      create_Video(
        data,
        type,
        saveVideo,
        saveImage,
        setSelect,
        setDone,
        setLoad,
      );
    }
  };
  return (
    <View style={GlobalStyle.Upload_Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={GlobalStyle.UploadTitle}>Title of the Video</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="Title of the video"
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
          <Text style={GlobalStyle.UploadTitle}>Description of the Video</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="description"
            placeholder="Description of the video"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            rules={{
              required: '*Description is required',
              minLength: {
                value: 20,
                message: '*Description is Too small',
              },
              maxLength: {
                value: 300,
                message: '*Description is Too big',
              },
            }}
          />
          {errors.description && (
            <Validation title={errors.description.message} />
          )}
        </View>
        <View style={styles.Container}>
          <Text style={GlobalStyle.UploadTitle}>
            Type of the video which will be either PODcast or Music Video
          </Text>
          <View style={styles.DropdownBox}>
            <SelectList
              placeholder="Type of the video"
              arrowicon={
                <Entypo
                  name="chevron-down"
                  size={scale(18)}
                  color={Colors.White}
                />
              }
              closeicon={
                <Entypo
                  name="chevron-up"
                  size={scale(18)}
                  color={Colors.White}
                />
              }
              dropdownStyles={GlobalStyle.dropdownStyles}
              dropdownItemStyles={GlobalStyle.dropdownItemStyles}
              boxStyles={GlobalStyle.boxStyles}
              dropdownTextStyles={GlobalStyle.dropdownTextStyles}
              inputStyles={GlobalStyle.inputStyles}
              search={false}
              setSelected={val => setType(val)}
              data={VideoData}
              save="value"
            />
          </View>
        </View>
        <View style={styles.Container}>
          <View style={[GlobalStyle.UploadImageBox, {height: Height * 0.35}]}>
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
              onPress={UploadImage}
              containerStyle={GlobalStyle.UploadBtnStyle}
              textStyle={GlobalStyle.UploadBtnTextStyle}
              title={
                saveImage ? 'Picture is Selected' : 'Tap to select a Picture'
              }
              selected={saveImage ? true : false}
            />
          </View>
        </View>

        <View style={styles.Container}>
          <UploadHeader
            title={'Video'}
            source={require('../../../assets/image/video.png')}
          />
          <CustomButton
            onPress={() => UploadVideo()}
            containerStyle={GlobalStyle.UploadBtnStyle}
            textStyle={GlobalStyle.UploadBtnTextStyle}
            title={saveVideo ? 'Video is selected' : 'Tap to select a video'}
            selected={saveVideo ? true : false}
          />
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          containerStyle={GlobalStyle.CustomButtonRestyle}
          textStyle={{color: Colors.White}}
          title="Upload"
        />
        <View style={{height: verticalScale(120)}} />
      </ScrollView>
      <Error isVisible={SelectImage} message={'Please select Thumbnail'} />
      <Error isVisible={SelectVideo} message={'Please select a Video'} />
      <Error
        isVisible={SelectType}
        message={'Please explain your Video type'}
      />
      <Success isVisible={Done} message={'Your Video has been uploaded'} />
      <Loading isVisible={Load} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(30),
  },
  inputBoxRestyle: {
    borderRadius: scale(20),
  },
});

export default Upload;
