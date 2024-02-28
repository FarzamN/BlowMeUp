import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


const AlbumCard = ({ onPress, source, title }) => {
  return (
    <Pressable android_ripple={{ color: Colors.White }} onPress={onPress} style={[styles.Container]}>
      <View style={styles.ImageBox}>
        <Image style={styles.Image} resizeMode="contain" source={source} />
      </View>
      <Text numberOfLines={1} style={styles.Text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#383B46',
    marginRight: scale(10),
    padding: moderateScale(5),
    borderRadius: scale(15),
    marginVertical: verticalScale(10),
    // overflow: 'hidden',
    width: scale(200)

  },
  Text: {
    color: Colors.White,
    fontFamily: Font.NunitoSans700,
    fontSize: scale(14),
    marginLeft: scale(10),
    marginTop: verticalScale(10),
    // maxWidth: '35%',
    overflow: 'hidden',
  },
  ImageBox: {
    // width: scale(160),
    height: verticalScale(110),
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(15),
  },
});
export default AlbumCard;
