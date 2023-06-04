import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import React from 'react';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Font } from '../../utils/font';

const RecentSong = ({ Data, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: 'rgba(20, 24, 36, 1)' }}
      onPress={onPress}
      style={styles.Container}>
      <View style={[GlobalStyle.Row, { justifyContent: 'center', }]}>
        <View style={styles.ImageBox}>
          <Image style={styles.Image} resizeMode="cover" source={Data.source} />
        </View>
        <View style={{ marginHorizontal: scale(10) }}>
          <Text style={styles.TextOne} numberOfLines={1}>
            {Data.title}
          </Text>
          <View
            style={[
              styles.Row,
              {
                alignSelf: 'flex-start',
              },
            ]}>
            <Text style={styles.TextTwo}>{Data.Value}</Text>
            <View style={styles.Dot} />
            <Text style={styles.TextTwo}>{Data.Singer}</Text>
          </View>
        </View>
      </View>
      <Pressable
        android_ripple={{ color: 'rgba(255, 24, 36, 1)', radius: 10 }}
        style={{ padding: moderateScale(0) }}>
        <Ionicons name="close" color={Colors.White} size={scale(18)} />
      </Pressable>
    </Pressable>

  );
};
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: scale(15),
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(10)
  },
  ImageBox: {
    width: scale(70),
    height: scale(70),
  },
  Image: { width: '100%', height: '100%', borderRadius: scale(10) },
  Row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  Dot: {
    backgroundColor: Colors.White,
    width: scale(3),
    aspectRatio: 1 / 1,
    borderRadius: 100,
    marginHorizontal: scale(6),
  },
});

export default RecentSong;