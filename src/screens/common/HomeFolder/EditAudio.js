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
import {Edit_Audio} from '../../../redux/actions/UserAction';
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
import DocumentPicker from 'react-native-document-picker';
import Loading from '../../../components/Modal/Loading';
import {SelectList} from 'react-native-dropdown-select-list';
import {SongData} from '../../../Constants/ArrayOfObject';
import Entypo from 'react-native-vector-icons/Entypo';
import Error from '../../../components/Modal/Error';

const Height = Dimensions.get('window').height;
const EditAudio = ({navigation, route}) => {
  const {Values} = route.params;
  console.log('data', Values);
  const [load, setLoad] = useState(false);
  const [saveImage, setsaveImage] = useState();
  const [audioFile, setAudioFile] = useState();
  const [type, setType] = useState();
  const [SelectType, setSelectType] = useState(false);

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
  const UploadSong = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      const AudioSource = {
        name: result?.[0]?.name,
        uri: result?.[0]?.uri,
        type: result?.[0]?.type,
      };

      setAudioFile(AudioSource);
    } catch (err) {
      console.log('Error: ', err);
    }
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
      Edit_Audio(setLoad, data, Values, saveImage, navigation, audioFile, type);
    }
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        NoSearch
        BackArrow
        Title
        Text="Edit Your Audios"
        TextRestyle={GlobalStyle.HeaderSmallText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopContainer}>
          <Text style={GlobalStyle.UploadTitle}>Update title of the Audio</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="title"
            placeholder="Title of the video"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            defaultValue={Values.title}
            value={Values.title}
            rules={{
              required: '*Title is required',
            }}
          />
          {errors.title && <Validation title={errors.title.message} />}

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

          <View style={styles.Container}>
            <View style={[GlobalStyle.UploadImageBox, {height: Height * 0.35}]}>
              <Image
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

          <View style={styles.Container}>
            <UploadHeader title={'Audio'} icon />
            <CustomButton
              onPress={() => UploadSong()}
              containerStyle={GlobalStyle.UploadBtnStyle}
              textStyle={GlobalStyle.UploadBtnTextStyle}
              title={
                audioFile ? 'Song is Selected' : 'Tap to select a new Song'
              }
              selected={audioFile ? true : false}
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
      <Error isVisible={SelectType} message={'Please explain your Song type'} />
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
});

export default EditAudio;
