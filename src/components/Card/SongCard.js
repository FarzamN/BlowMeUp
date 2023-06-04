import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../../utils/font';
import { Colors } from '../../utils/Colors';

const SongCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.Container, { marginLeft: data.Type === 'first' ? scale(10) : 0 }]}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ borderRadius: scale(15) }}
        style={styles.Image}
        source={data.source}>
        <View style={styles.TextBox}>
          <Text style={styles.Song}>{data.Song}</Text>
          <Text style={styles.Singer}>{data.Singer}</Text>
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
    marginRight: scale(10)
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  TextBox: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: moderateScale(10),
  },
  Song: {
    fontSize: scale(13),
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
