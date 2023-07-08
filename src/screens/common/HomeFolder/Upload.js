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
const Upload = () => {
  const userDetails = useSelector(state => state.userDetails);
  const [type, setType] = useState('');
  const [saveVideo, setsaveVideo] = useState();
  const data = [
    {key: '1', value: 'MP4 '},
    {key: '2', value: 'MOV'},
    {key: '3', value: 'WMV'},
    {key: '4', value: 'AVI'},
    {key: '5', value: 'AVCHD'},
    {key: '6', value: 'FLV'},
    {key: '7', value: 'F4V'},
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
        Toast.show('User cancelled Video picker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else {
        const source = {
          name: response.assets?.[0]?.fileName,
          uri: response.assets?.[0]?.uri,
          type: response.assets?.[0]?.type,
        };
        setsaveVideo(source);
      }
    });
  };

  const onSubmit = data => {
    create_Video(userDetails, data, type, saveVideo);
  };
  return (
    <View style={{height: '100%'}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={styles.Title}>Tittle of the Video</Text>
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
          <Text style={styles.Title}>
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
          <View style={styles.Row}>
            <Text style={styles.Title}>Upload file</Text>
            <Image
              resizeMode="contain"
              style={styles.Image}
              source={require('../../../assets/image/photo.png')}
            />
          </View>
          {/* <VideoPicker /> */}
          <CustomButton
            onPress={() => UploadVideo()}
            containerStyle={styles.containerStyle}
            textStyle={styles.textStyle}
            title="Tab to select a video"
          />
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          containerStyle={GlobalStyle.CustomButtonRestyle}
          textStyle={{color: Colors.White}}
          title="Upload"
        />
        <View style={{height: verticalScale(110)}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Title: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(16),
  },
  Container: {
    marginTop: verticalScale(30),
  },
  Image: {
    width: scale(25),
    height: scale(25),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: scale(20),
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
    backgroundColor: Colors.Main,
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
