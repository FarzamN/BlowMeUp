import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {SelectList} from 'react-native-dropdown-select-list';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Validation from '../../../components/Validation';
import {create_Video} from '../../../redux/actions/UserAction';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import UploadHeader from '../../../components/Header/UploadHeader';
import Error from '../../../components/Modal/Error';
import Success from '../../../components/Modal/Success';

const Upload = ({select, setSelect}) => {
  console.log('select', select);
  // const userDetails = useSelector(state => state.userDetails);
  const [type, setType] = useState();
  const [saveVideo, setsaveVideo] = useState();
  const [saveImage, setsaveImage] = useState();
  const [SelectImage, setSelectImage] = useState(false);
  const [SelectVideo, setSelectVideo] = useState(false);
  const [SelectType, setSelectType] = useState(false);
  const [Done, setDone] = useState(false);
  const data = [
    {key: '1', value: 'PodCast'},
    {key: '2', value: 'Music Video'},
  ];
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
        const VideoSource = {
          name: response.assets?.[0]?.fileName,
          uri: response.assets?.[0]?.uri,
          type: response.assets?.[0]?.type,
        };
        setsaveVideo(VideoSource);
        console.log('source', VideoSource);
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
        const ImageSource = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        };
        setsaveImage(ImageSource);
        console.log('ImageSource', ImageSource);
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
      create_Video(data, type, saveVideo, saveImage, setSelect, setDone);
    }
  };
  return (
    <View style={{height: '100%', marginHorizontal: scale(15)}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={GlobalStyle.UploadTitle}>Title of the Video</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="Title of the video"
            Gapp={styles.Gapp}
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
            Gapp={styles.Gapp}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            // rules={{
            //  
            // }}
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
              dropdownStyles={styles.dropdownStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              boxStyles={styles.boxStyles}
              dropdownTextStyles={styles.dropdownTextStyles}
              inputStyles={styles.inputStyles}
              search={false}
              setSelected={val => setType(val)}
              data={data}
              save="value"
            />
          </View>
        </View>
        <View style={styles.Container}>
          <UploadHeader
            title={'Image'}
            source={require('../../../assets/image/photo.png')}
          />
          <CustomButton
            onPress={() => UploadImage()}
            containerStyle={styles.containerStyle}
            textStyle={styles.textStyle}
            title={saveImage ? saveImage.name : 'Tap to select a Thumbnail'}
          />
        </View>

        <View style={styles.Container}>
          <UploadHeader
            title={'Video'}
            source={require('../../../assets/image/video.png')}
          />
          <CustomButton
            onPress={() => UploadVideo()}
            containerStyle={styles.containerStyle}
            textStyle={styles.textStyle}
            title={saveVideo ? saveVideo.name : 'Tap to select a video'}
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
      <Error isVisible={SelectType} message={'Please explain your Video type'} />
      <Success isVisible={Done} message={'Your Video has been uploaded'} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(30),
  },

  Gapp: {
    paddingHorizontal: 0,
  },
  inputBoxRestyle: {
    borderRadius: scale(20),
  },
  boxStyles: {
    backgroundColor: 'transparent',
    height: verticalScale(50),
    alignItems: 'center',
    borderRadius: scale(20),
    marginTop: verticalScale(20),
    borderWidth: scale(1),
    borderColor: Colors.White,
  },
  inputStyles: {
    color: Colors.White,
    fontSize: scale(13),
    fontFamily: Font.Gilroy500,
  },
  dropdownTextStyles: {
    color: Colors.White,
  },
  dropdownItemStyles: {
    backgroundColor: Colors.ThemeBlue,
  },
  dropdownStyles: {
    backgroundColor: Colors.ThemeBlue,
    borderWidth: scale(1),
    borderColor: Colors.Main,
  },
  containerStyle: {
    borderWidth: scale(1),
    borderColor: Colors.White,
    height: verticalScale(50),
    borderRadius: scale(20),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(25),
    marginTop: verticalScale(15),
    backgroundColor: Colors.Non,
    width: '95%',
  },
  textStyle: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
  },
});

export default Upload;
