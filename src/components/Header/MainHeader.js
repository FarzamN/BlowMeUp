import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {useNavigation} from '@react-navigation/native';
const MainHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={[styles.Container, props.Container]}>
      <View style={{flexDirection: 'row'}}>
        {props.Logo ? (
          <Image style={styles.Image} source={props.source} />
        ) : null}
        {props.BackArrow ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowBox}>
            <Ionicons name="arrow-back" color={Colors.Main} size={scale(18)} />
          </TouchableOpacity>
        ) : null}
        {props.Search ? (
          <Feather name="search" color={Colors.Main} size={scale(20)} />
        ) : null}
        {props.Title ? (
          <Text style={[styles.Text, props.TextRestyle]}>{props.Text}</Text>
        ) : null}
      </View>

      {props.Notification ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Feather
              style={{marginHorizontal: scale(10)}}
              name="search"
              size={scale(20)}
              color={Colors.White}
            />
          </TouchableOpacity >
          <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
             <Ionicons
              name="notifications-outline"
              size={scale(20)}
              color={Colors.White}
            />
            <View style={[styles.Dot,{backgroundColor: props.False ? 'transparent' :'red'}]}/>
          </TouchableOpacity>
        </View>
      ) : null}
      {props.edit ? (
        <TouchableOpacity onPress={props.editOnPress} activeOpacity={0.6}>
          <Text style={styles.editText}>{props.editText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateVerticalScale(20),
    paddingHorizontal:moderateScale(20)
  },
  arrowBox: {
    borderWidth: scale(1),
    borderRadius: scale(5),
    borderColor: Colors.Main,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  Text: {
    fontFamily: Font.Gilroy700,
    fontSize: scale(17),
    paddingHorizontal: moderateScale(15),
    color: Colors.White,
    textAlignVertical: 'center',
  },
  Image: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  editText: {
    color: Colors.White,
    fontFamily: Font.Poppins500,
    fontSize: scale(12),
  },
  Dot:{width:scale(5),aspectRatio:1/1,position:'absolute',right:3,top:2,borderRadius:100}
});

export default MainHeader;
