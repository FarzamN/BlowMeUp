import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Edit_Video} from '../../../redux/actions/UserAction';
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
import {SelectList} from 'react-native-dropdown-select-list';
import Entypo from 'react-native-vector-icons/Entypo';
import {Font} from '../../../utils/font';
import Error from '../../../components/Modal/Error';
import {VideoData} from '../../../Constants/ArrayOfObject';

const Height = Dimensions.get('window').height;
const EditVideo = ({navigation, route}) => {
  const {Values} = route.params;
  console.log('data', Values);
  const [load, setLoad] = useState(false);
  const [saveImage, setsaveImage] = useState();
  const [saveVideo, setsaveVideo] = useState();
  const [type, setType] = useState();
  const [SelectType, setSelectType] = useState(false);

  console.log('type', type);
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
      }
    });
  };

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
      }
    });
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    if (type == null) {
      setSelectType(true);
      setTimeout(() => {
        setSelectType(false);
      }, 2000);
    } else {
      Edit_Video(setLoad, data, Values, saveVideo, saveImage, navigation, type);
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        NoSearch
        BackArrow
        Title
        Text="Edit Your Video"
        TextRestyle={GlobalStyle.HeaderSmallText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopContainer}>
          <Text style={GlobalStyle.UploadTitle}>Update title of the Video</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="Title of the video"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            defaultValue={Values.video_title}
            value={Values.video_title}
            rules={{
              required: '*Title is required',
            }}
          />
          {errors.title && <Validation title={errors.title.message} />}
          <View style={styles.Container}>
            <Text style={GlobalStyle.UploadTitle}>
              Update description of the Video
            </Text>
            <CustomInput
              control={control}
              keyboardType="default"
              name="description"
              placeholder="Description of the video"
              Gapp={GlobalStyle.noGap}
              style={styles.inputBoxRestyle}
              fontSize={scale(16)}
              defaultValue={Values.description}
              value={Values.description}
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
              defaultOption={{key:Values.video_type,value:Values.video_type}}
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

          <View style={styles.Container}>
            <View style={[GlobalStyle.UploadImageBox, {height: Height * 0.35}]}>
              <Image
                style={[GlobalStyle.Image, {borderRadius: scale(15)}]}
                source={{uri: saveImage ? saveImage.uri : Values.img}}
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

          <View style={styles.Container}>
            <UploadHeader
              title={'Video'}
              source={require('../../../assets/image/video.png')}
            />
            <CustomButton
              onPress={() => UploadVideo()}
              containerStyle={GlobalStyle.UploadBtnStyle}
              textStyle={GlobalStyle.UploadBtnTextStyle}
              title={saveVideo ? 'New video is selected' : 'Select a new video'}
              selected={saveVideo ? true : false}
            />
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
      <Error
        isVisible={SelectType}
        message={'Please explain your Video type'}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(30),
  },
  TopContainer: {
    marginHorizontal: scale(20),
    marginVertical: verticalScale(10),
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
});

export default EditVideo;
