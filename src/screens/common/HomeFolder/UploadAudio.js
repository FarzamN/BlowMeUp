import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
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
import {create_song} from '../../../redux/actions/UserAction';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import UploadHeader from '../../../components/Header/UploadHeader';
import Error from '../../../components/Modal/Error';
import Success from '../../../components/Modal/Success';
import Loading from '../../../components/Modal/Loading';
import {SongData} from '../../../Constants/ArrayOfObject';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Height = Dimensions.get('window').height;
const UploadAudio = ({setSelect}) => {
  const [type, setType] = useState();
  const [saveImage, setsaveImage] = useState();
  const [audioFile, setAudioFile] = useState();
  const [SelectImage, setSelectImage] = useState(false);
  const [SelectAudio, setSelectAudio] = useState(false);
  const [SelectType, setSelectType] = useState(false);
  const [Done, setDone] = useState(false);
  const [Load, setLoad] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});




  const requestPermissionsAud = async () => {
    try {
      const documentPermissionStatus = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.MEDIA_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
  
      return  documentPermissionStatus === RESULTS.GRANTED;
    } catch (error) {
      console.log('Error requesting permissions:', error);
      return false;
    }
  };
  const requestPermissions = async () => {
    try {
      const photoPermissionStatus = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
  
      // const documentPermissionStatus = await request(
      //   Platform.OS === 'ios' ? PERMISSIONS.IOS.MEDIA_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      // );
  
      return photoPermissionStatus === RESULTS.GRANTED;
    } catch (error) {
      console.log('Error requesting permissions:', error);
      return false;
    }
  };
  

  const UploadImage = async () => {
    const permissionsGranted = await requestPermissions();

    if (!permissionsGranted) {
      Toast.show('Photo and/or Document permissions denied');
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

  const UploadSong = async () => {
    const permissionsGranted = await requestPermissionsAud();

    if (!permissionsGranted) {
      Toast.show('Photo and/or Document permissions denied');
      return;
    }
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      const ele = result?.[0]
      const AudioSource = {
        name: ele?.name,
        uri: ele?.uri,
        type: ele?.type,
      };

      setAudioFile(AudioSource);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const onSubmit = data => {
    if (saveImage == null) {
      setSelectImage(true);
      setTimeout(() => {
        setSelectImage(false);
      }, 2000);
    } else if (type == null) {
      setSelectType(true);
      setTimeout(() => {
        setSelectType(false);
      }, 2000);
    } else if (audioFile == null) {
      setSelectAudio(true);
      setTimeout(() => {
        setSelectAudio(false);
      }, 2000);
    } else {
      create_song(
        data,
        setLoad,
        setDone,
        type,
        saveImage,
        setSelect,
        audioFile,
      );
      Toast.show('Please Wait...');
    }
  };

  return (
    <View style={GlobalStyle.Upload_Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={GlobalStyle.UploadTitle}>Title of the Song</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="Title of the Song"
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
          <Text style={GlobalStyle.UploadTitle}>Please Type of your song</Text>
          <View style={styles.DropdownBox}>
            <SelectList
              placeholder="Type of sour song"
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
              data={SongData}
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
          <UploadHeader title={'Audio'} icon />
          <CustomButton
            onPress={() => UploadSong()}
            containerStyle={GlobalStyle.UploadBtnStyle}
            textStyle={GlobalStyle.UploadBtnTextStyle}
            title={audioFile ? 'Song is Selected' : 'Tap to select a Song'}
            selected={audioFile ? true : false}
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
      <Error isVisible={SelectAudio} message={'Please select an Audio'} />
      <Error isVisible={SelectImage} message={'Please select an Image'} />
      <Error isVisible={SelectType} message={'Please explain your Song type'} />
      <Success isVisible={Done} message={'Your Song has been uploaded'} />
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
export default UploadAudio;
