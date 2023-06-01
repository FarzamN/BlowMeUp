import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {Font} from '../utils/font';
import {scale, verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
const SettingItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.6}
      style={styles.Container}>
      <Text style={styles.Text}>{props.Title}</Text>
      <View style={styles.Row}>
        {props.Notificatin ? (
          <View style={styles.Circle2}>
            <Text style={styles.Number}>35</Text>
          </View>
        ) : null}
        <View style={styles.Circle}>
          <Entypo name="chevron-right" size={scale(15)} color={Colors.Grey} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: scale(12),
    marginVertical: verticalScale(12),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Poppins500,
    fontSize: scale(16),
  },
  Circle: {
    backgroundColor: Colors.White,
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    height: scale(15),
    width: scale(15),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Number: {
    color: Colors.White,
    fontFamily: Font.Poppins500,
    top: 1.5,
  },
  Circle2: {
    backgroundColor: Colors.Yellow,
    height: scale(30),
    width: scale(25),
    aspectRatio: 1 / 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(20),
  },
});

export default SettingItem;
