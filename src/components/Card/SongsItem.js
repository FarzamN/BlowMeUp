import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../../utils/font';
import { Colors } from '../../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { GlobalStyle } from '../../Constants/GlobalStyle';
const SongsItem = ({ data, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: 'rgba(20, 24, 36, 1)' }}
      // onPress={onPress}
      style={styles.Container}>
      <View style={[GlobalStyle.Row, { justifyContent: 'center' }]}>
        <View style={styles.ImageBox}>
          <Image style={styles.Image} resizeMode="cover" source={data.source} />
        </View>
        <View style={{ marginHorizontal: scale(10) }}>
          <Text style={styles.TextOne} numberOfLines={1}>
            {data.SongName}
          </Text>
          <View
            style={[
              GlobalStyle.Row,
              {
                alignSelf: 'flex-start',
              },
            ]}>
            <Text style={styles.TextTwo}>{data.Playlist}</Text>
            <Text style={styles.TextTwo}> · </Text>
            <Text style={styles.TextTwo}>{data.Name}</Text>
          </View>
        </View>
      </View>

      <Entypo name="chevron-right" color={Colors.Yellow} size={scale(20)} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(10)
  },
  ImageBox: {
    width: scale(70),
    height: scale(70),
  },
  Image: { width: '100%', height: '100%', borderRadius: scale(10) },
  TextOne: {
    fontSize: scale(16),
    fontFamily: Font.Inter700,
    color: Colors.White,
  },
  TextTwo: {
    fontSize: scale(14),
    fontFamily: Font.Inter400,
    color: Colors.Main,
  },
});

export default SongsItem;
