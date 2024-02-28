import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../Constants/GlobalStyle';
import {Colors} from '../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../utils/font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ModalRowItem = props => {
  return (
    <Pressable onPress={props.onPRess} style={[GlobalStyle.Row, styles.MainContainer]} android_ripple={{color: Colors.placeholderTextColor}}>
        {props.MaterialCommunityIcons ? (
          <MaterialCommunityIcons
            name={props.name}
            color={Colors.White}
            size={scale(25)}
          />
        ) : null}
        {props.MaterialIcons ? (
          <MaterialIcons
            name={props.name}
            color={Colors.White}
            size={scale(25)}
          />
        ) : null}

        <Text style={styles.Text}>{props.Title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    height: verticalScale(50),
    paddingHorizontal: moderateScale(25),
    alignItems: 'center',
  },
  Text: {
    fontSize: scale(15),
    fontFamily: Font.Gilroy600,
    paddingHorizontal: moderateScale(10),
    color: Colors.White,
  },
});
export default ModalRowItem;
