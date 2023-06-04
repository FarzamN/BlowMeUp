import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

import { Font } from '../../utils/font';
import { Colors } from '../../utils/Colors';

const GernCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.Container, { marginLeft: data.Type === 'first' ? scale(10) : 0 }]}>
      <View style={[styles.MainBox, { backgroundColor: null }]}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ borderRadius: scale(15) }}
          style={styles.Image}
          source={data.source}>
          <View style={[styles.TextBox, { flexDirection: 'column' }]}>
            <Text style={styles.GernText}>{data.Genre}</Text>
            <Text style={styles.pop}>{data.pop}</Text>
          </View>
          <View style={styles.LinearGradient}>
            <View style={[styles.TextBox, { justifyContent: 'flex-end' }]}>
              <Text style={styles.lastGernText}>{data.lastGernText}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
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
  MainBox: {
    flex: 1,
    borderRadius: scale(15),
  },
  GernText: {
    fontSize: scale(10),
    fontFamily: Font.Poppins400,
    color: Colors.White,
  },
  pop: {
    fontSize: scale(22),
    fontFamily: Font.Poppins600,
    color: Colors.White,
    marginTop: verticalScale(-10),
  },
  lastGernText: {
    fontSize: scale(13),
    fontFamily: Font.Poppins600,
    color: Colors.White,
  },
  TextBox: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateVerticalScale(8),
  },
  BottomBar: {
    backgroundColor: Colors.ThemeSky,
    width: '93%',
    height: verticalScale(5),
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0.5,
    borderBottomRightRadius: scale(20),
    borderBottomLeftRadius: scale(20),
  },
  TopGradient: {
    flex: 2,
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15),
  },
  LinearGradient: {
    flex: 0.7,
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
  },
  Image: {
    width: '100%',
    height: '100%',
  },
});

export default GernCard;
