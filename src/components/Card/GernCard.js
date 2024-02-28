import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';

const GernCard = ({data, onPress, boxRestyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.Container, boxRestyle]}>
      <View style={[styles.MainBox, {backgroundColor: Colors.Non}]}>
        <LinearGradient 
          colors={data.color}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.Image}>
          <View style={[styles.TextBox, {flexDirection: 'column'}]}>
            <Text style={styles.GeneraText}>Genre</Text>
            <Text style={styles.pop}>{data.name}</Text>
          </View>
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'rgba(255,255,255,0.4)']}
            start={{x: 0.4, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.LinearGradient}>
            <View style={styles.RightBar} />
            <View style={[styles.TextBox, {justifyContent: 'flex-end'}]}>
              <Text style={styles.lastGeneraText}>{data.name}</Text>
            </View>
          </LinearGradient>
          <View style={styles.BottomBar} />
        </LinearGradient>
      </View>
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
  MainBox: {
    flex: 1,
    borderRadius: scale(15),
  },
  GeneraText: {
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
  lastGeneraText: {
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
  RightBar: {
    backgroundColor: Colors.ThemeSky,
    width: scale(3.5),
    height: '70%',
    position: 'absolute',
    left: 0,
    bottom: verticalScale(9),
  },
  TopGradient: {
    flex: 2,
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15),
  },
  LinearGradient: {
    flex: 0.5,
    // backgroundColor:'rgba(0,0,0,0.4)',
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(15),
  },
});

export default GernCard;
