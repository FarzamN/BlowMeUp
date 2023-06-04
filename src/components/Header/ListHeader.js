import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { Font } from '../../utils/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../utils/Colors';
import * as ImagePicker from 'react-native-image-picker'
const ListHeader = props => {
  const [videoSource, setVideoSource] = useState('');

  const options2 = {
    title: 'Select video',
    mediaType: 'video',
    path: 'video',
    quality: 1
  };

  const selectVideo = () => {
    ImagePicker.launchImageLibrary(options2, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled Video picker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setVideoSource(source);
      }
    });
  };

  const selectAudio = () => {

  }
  return (
    <View style={styles.container}>
      <View style={styles.Row}>
        {props.Logo ? (
          <Image style={styles.Image} source={props.source} />
        ) : null}
        <Text style={[styles.Title, props.TitleRestyle]}>{props.Title}</Text>
      </View>

      {props.UploadTrue ? (
        <TouchableOpacity
          onPress={props.UploadVideo ? selectVideo : props.UploadAudio ? selectAudio : null}
          style={styles.MoreBox}>
          <Text style={styles.Text}>Upload</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.Row, styles.MoreBox]}>
          <Text style={styles.Text}>{props.Text}</Text>
          {props.Icon ? (
            <AntDesign
              name="rightcircleo"
              color={Colors.Black}
              size={scale(15)}
              style={{ marginLeft: scale(7) }}
            />
          ) : null}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
    paddingHorizontal: moderateScale(10),
  },
  Row: { flexDirection: 'row', alignItems: 'center' },
  Image: {
    width: scale(22),
    height: verticalScale(22),
    marginRight: scale(10),
  },
  Title: {
    fontSize: scale(15),
    fontFamily: Font.Poppins600,
    color: Colors.White,
  },
  Text: {
    color: Colors.Black,
    fontSize: scale(12),
    fontFamily: Font.Poppins500,
  },
  MoreBox: {
    backgroundColor: Colors.White,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(5),
    borderRadius: scale(20),
  },
});

export default ListHeader;
