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
import {Edit_Stream} from '../../../redux/actions/UserAction';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import MainHeader from '../../../components/Header/MainHeader';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {scale, verticalScale} from 'react-native-size-matters';
import Validation from '../../../components/Validation';
import Loading from '../../../components/Modal/Loading';
import {UrlRegex} from '../../../utils/url';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import UploadHeader from '../../../components/Header/UploadHeader';

const EditStream = ({navigation, route}) => {
  const {Values} = route.params;
  console.log('data', Values);
  const Height = Dimensions.get('window').height;
  const [load, setLoad] = useState(false);
  const [saveImage, setsaveImage] = useState();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    Edit_Stream(setLoad, data, Values, navigation, saveImage);
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
      }
    });
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        NoSearch
        BackArrow
        Title
        Text="Edit Your Stream"
        TextRestyle={GlobalStyle.HeaderSmallText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopContainer}>
          <View style={styles.Container}>
            <Text style={GlobalStyle.UploadTitle}>
              Title of your Live Stream
            </Text>
            <CustomInput
              control={control}
              keyboardType="default"
              name="title"
              placeholder="Title of your Live Stream"
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
            <Text style={GlobalStyle.UploadTitle}>
              Link of your Live Stream
            </Text>
            <CustomInput
              control={control}
              keyboardType="default"
              name="link"
              placeholder="Link of your Live Stream"
              Gapp={GlobalStyle.noGap}
              style={styles.inputBoxRestyle}
              fontSize={scale(16)}
              defaultValue={Values.live_stream}
              value={Values.live_stream}
              rules={{
                required: '*Link is required',
                pattern: {
                  value: UrlRegex,
                  message: 'URl is not valid',
                },
              }}
            />
            {errors.link && <Validation title={errors.link.message} />}
          </View>

          <CustomButton
            onPress={handleSubmit(onSubmit)}
            containerStyle={GlobalStyle.CustomButtonRestyle}
            textStyle={{color: Colors.White}}
            title="Upload"
          />
        </View>
      </ScrollView>
      <Loading isVisible={load} />
    </SafeAreaView>
  );
};

export default EditStream;

const styles = StyleSheet.create({
  TopContainer: {
    marginHorizontal: scale(20),
    marginVertical: verticalScale(10),
  },
  Container: {
    marginTop: verticalScale(30),
  },
});
