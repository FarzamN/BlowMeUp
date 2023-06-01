import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import {SelectList} from 'react-native-dropdown-select-list';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import VideoPicker from '../../../utils/VideoPicker';
const Upload = () => {
  const [selected, setSelected] = useState('');

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
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  return (
    <View style={{height: '100%'}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={styles.Title}>Tittle of the Video</Text>
          <CustomInput
            control={control}
            keyboardType="default"
            name="Title"
            placeholder="Title of the video"
          />
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
              dropdownStyles={{backgroundColor: Colors.Main}}
              dropdownItemStyles={{backgroundColor: '#fff'}}
              boxStyles={{
                backgroundColor: 'transparent',
                height: verticalScale(50),
                alignItems: 'center',
                borderRadius: scale(23),
                marginTop: verticalScale(20),
                borderWidth: scale(1),
                borderColor: Colors.White,
              }}
              dropdownTextStyles={{color: Colors.Black}}
              inputStyles={{
                color: Colors.White,
                fontSize: scale(13),
                fontFamily: Font.Gilroy500,
              }}
              search={false}
              setSelected={val => setSelected(val)}
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
          <VideoPicker />
        </View>
        <View style={{height: verticalScale(130)}} />
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
});

export default Upload;
