import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font} from '../../utils/font';

const RecentSong = ({Data}) => {
  return (
    <View style={[GlobalStyle.Row, styles.TopHeader]}>
      <View style={[styles.MainBox, GlobalStyle.Row]}>
        <View style={styles.ImageBox}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%', borderRadius: scale(5)}}
            source={Data.source}
          />
        </View>
        <View style={{paddingHorizontal: moderateScale(10)}}>
          <Text style={styles.title}>{Data.title}</Text>
          <View style={GlobalStyle.Row}>
            <Text style={styles.Singer}>{Data.Value}</Text>
            <View style={styles.Dot} />
            <Text style={styles.Singer}>{Data.Singer}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="close" color={Colors.White} size={scale(18)} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    width: scale(50),
    height: scale(40),
  },
  title: {
    color: Colors.White,
    fontSize: scale(13),
    fontFamily: Font.Gilroy500,
  },
  Singer: {
    color: Colors.White,
    fontSize: scale(12),
    fontFamily: Font.Gilroy400,
  },
  Dot: {
    backgroundColor: Colors.White,
    width: scale(3),
    aspectRatio: 1 / 1,
    borderRadius: 100,
    marginHorizontal: scale(6),
  },
  TopHeader: {
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    width:'90%',
    alignSelf:'center',
    zIndex:-1
},
});

export default RecentSong;
