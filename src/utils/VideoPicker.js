import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from './Colors';
import {Font} from './font';

const VideoPicker = () => {
  const [saveimage, setsaveimage] = useState();
  const [show, setShow] = useState(true);
  const photosave = () => {
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
        console.log('ez pz');
      } else if (res.error) {
        console.log('ez pz win');
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        setsaveimage(res.assets?.[0]?.uri);
        setShow(false);
      }
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => photosave}
      style={styles.Container}>
      <Text style={styles.Text}>Tab to select a video</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: scale(1),
    borderColor: Colors.White,
    height: verticalScale(50),
    borderRadius: scale(23),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(25),
    marginTop: verticalScale(15),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
  },
});
export default VideoPicker;
