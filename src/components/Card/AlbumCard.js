import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const AlbumCard = ({data}) => {
  return (
    <View style={[styles.Container,{marginLeft:data.type == 'first' ? scale(20) : 0}]}>
      <View style={styles.ImageBox}>
        <Image style={styles.Image} resizeMode="contain" source={data.source} />
      </View>
      <Text style={styles.Text}>{data.Name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#383B46',
    marginRight: scale(10),
    padding: moderateScale(5),
    borderRadius: scale(15),
    marginVertical: verticalScale(10),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.NunitoSans700,
    fontSize: scale(14),
    marginLeft: scale(10),
    marginTop: verticalScale(10),
  },
  ImageBox: {
    width: scale(160),
    height: verticalScale(110),
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(15),
  },
});
export default AlbumCard;
