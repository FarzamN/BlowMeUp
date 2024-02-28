import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from '../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
// import Entypo from 'react-native-vector-icons/Entypo';
import {Font} from '../../utils/font';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const LeaderBoardCard = ({data}) => {
  const one = data.type === 'first';
  const two = data.type === 'second';
  const three = data.type === 'third';

  return (
    <>
      <View
        style={[
          GlobalStyle.Row,
          styles.container,
          {
            backgroundColor: one
              ? Colors.Yellow
              : two
              ? '#F4F4F4'
              : three
              ? Colors.ThemeOrange
              : Colors.Non,
          },
        ]}>
        <View style={GlobalStyle.Row}>
          {/* <Entypo
            name={one ? 'chevron-up' : two ? 'chevron-down' : 'minus'}
            size={scale(20)}
            color={
              one ? '#208B1E' : two ? '#911E1E' : three ? '#FFFFFF' : '#FFFFFF'
            }
          /> */}
          <Text
            style={[
              styles.Text,
              {
                marginHorizontal: scale(5),
                color: one || two || three ? Colors.ThemeBlue : Colors.White,
              },
            ]}>
            {one ? 1 : two ? 2 : three ? 3 : data.count}
          </Text>
          <View style={styles.imageBox}>
            <Image
              style={[GlobalStyle.Image,{borderRadius: scale(100),}]}
              source={{
                uri: data.image,
              }}
            />
          </View>
          <Text
            style={[
              styles.Text,
              {
                color: one || two || three ? Colors.ThemeBlue : Colors.White,
              },
            ]}>
            {data.name}
          </Text>
        </View>
        <Text
          style={[
            styles.Text,
            {
              color: one || two || three ? Colors.ThemeBlue : Colors.White,
            },
          ]}>
          {data.point === null  ? 0 : data.point} pts.
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(20),
    paddingVertical: moderateVerticalScale(10),
    borderRadius: scale(17),
  },
  imageBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(100),
    marginHorizontal: scale(10),
  },
  Text: {
    fontFamily: Font.Nats,
    fontSize: scale(14),
  },
});

export default LeaderBoardCard;
