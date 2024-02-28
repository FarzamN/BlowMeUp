import {StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, moderateVerticalScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../utils/Colors';
import {Font} from '../utils/font';

const OptionToolTip = props => {
  return (
    <View
      style={[
        {
          height: verticalScale(70),
          borderRadius: scale(12),
          backgroundColor: Colors.Ash,
            width:scale(80),
            overflow:'hidden'
        },
        props.restylePopover,
      ]}>
      <Pressable
      android_ripple={{color:Colors.Main}} 
        onPress={props.onPress}
        style={[styles.MoreBox, props.restyleBox]}>
        <Text style={styles.MoreText}>{props.OptionOne}</Text>
      </Pressable>

      <Pressable android_ripple={{color:'red'}} onPress={props.onDelete} style={styles.MoreBox}>
        <Text style={styles.MoreText}>{props.OptionTwo}</Text>
      </Pressable>
    </View>
  );
};

export default OptionToolTip;

const styles = StyleSheet.create({
  MoreBox: {
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  MoreText: {
    fontFamily: Font.Poppins700,
    fontSize: scale(12),
    color: Colors.White,
  },
});
