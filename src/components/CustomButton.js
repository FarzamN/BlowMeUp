import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Font } from '../utils/font';
import { Colors } from '../utils/Colors';
const CustomButton = props => {
  return (
    <Pressable
      android_ripple={{
        color: 'rgba(20, 24, 36, 1)',
        borderless: true,
        foreground: true,
      }}
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.containerStyle, props.containerStyle]}>
      {props.Play && (
        <Entypo
          style={{ paddingHorizontal: 5 }}
          name="controller-play"
          color={Colors.White}
          size={20}
        />
      )}

      <Text style={[styles.font, props.textStyle]}>{props.title}</Text>
      {props.selected ? (
        <AntDesign
          style={{ paddingHorizontal: 5 }}
          name="checkcircle"
          color={Colors.Main}
          size={scale(20)}
        />
      ) : null}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    marginTop: verticalScale(5),
    alignSelf: 'center',
    backgroundColor: '#CED9F8',
    height: verticalScale(52),
    borderWidth: scale(1),
    borderColor: Colors.Yellow,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  font: {
    color: Colors.ThemeBlue,
    fontSize: scale(15),
    textTransform: 'capitalize',
    fontFamily: Font.Poppins500,
    top: 1.5,
  },
});
