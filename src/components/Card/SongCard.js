import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';

const SongCard = ({data, onPress, boxRestyle}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.Container, boxRestyle]}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{borderRadius: scale(15)}}
        style={styles.Image}
        source={{uri: data.img}}>
        <View style={styles.TextBox}>
          <Text style={styles.Singer}>{data.name}</Text>
          <Text style={styles.Song}>
            {data.video_title ? data.video_title : data.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: scale(130),
    aspectRatio: 1 / 1,
    marginTop: verticalScale(20),
    marginRight: scale(10),
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  TextBox: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: moderateVerticalScale(10),
    paddingLeft: moderateScale(10),
  },
  Song: {
    fontSize: scale(12),
    fontFamily: Font.Poppins600,
    color: Colors.White,
  },
  Singer: {
    fontSize: scale(12),
    fontFamily: Font.Poppins400,
    color: Colors.White,
  },
});

export default SongCard;
