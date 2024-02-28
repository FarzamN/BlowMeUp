import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {scale, verticalScale} from 'react-native-size-matters';
import Validation from '../../../components/Validation';
import Toast from 'react-native-simple-toast';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import {store_livestream} from '../../../redux/actions/UserAction';
import Error from '../../../components/Modal/Error';
import {UrlRegex} from '../../../utils/url';
import Success from '../../../components/Modal/Success';
import UploadHeader from '../../../components/Header/UploadHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import Loading from '../../../components/Modal/Loading';

const UploadStream = ({setSelect}) => {
  const Height = Dimensions.get('window').height;
  const [load, setLoad] = useState(false);
  const [saveImage, setsaveImage] = useState();
  const [SelectImage, setSelectImage] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    if (saveImage == null) {
      setSelectImage(true);
      setTimeout(() => {
        setSelectImage(false);
      }, 2000);
    } else {
      store_livestream(data, setLoad, saveImage, setSelect);
    }
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
    <View style={GlobalStyle.Upload_Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={GlobalStyle.UploadTitle}>Title of your Live Stream</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="name"
            placeholder="Title of your Live Stream"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
            rules={{
              required: '*Title is required',
            }}
          />
          {errors.title && <Validation title={errors.name.message} />}
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
          <Text style={GlobalStyle.UploadTitle}>Link of your Live Stream</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="link"
            placeholder="Link of your Live Stream"
            Gapp={GlobalStyle.noGap}
            style={styles.inputBoxRestyle}
            fontSize={scale(16)}
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
        <View style={{height: verticalScale(120)}} />
      </ScrollView>
      <Loading isVisible={load} />
      <Error isVisible={SelectImage} message={'Please select Thumbnail'} />
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

export default UploadStream;
