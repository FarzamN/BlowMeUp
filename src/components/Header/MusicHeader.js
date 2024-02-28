import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyle } from '../../Constants/GlobalStyle';

const MusicHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={[styles.Container, props.Container, GlobalStyle.Row]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrowBox}>
        <Ionicons name="arrow-back" color={Colors.Main} size={scale(18)} />
      </TouchableOpacity>
      <View style={styles.Row}>
        <Fontisto name="music-note" color={Colors.Main} size={scale(30)} />
        <Text style={[styles.Text, props.TextRestyle]}>Playing Music</Text>
      </View>
      <Ionicons name="arrow-back" color="transparent" size={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'space-between',
    paddingVertical: moderateVerticalScale(20),
    paddingHorizontal: moderateScale(20)
  },
  Text: {
    fontFamily: Font.Gilroy700,
    fontSize: scale(20),
    color: Colors.White,
    textAlignVertical: 'center',
    paddingHorizontal: moderateScale(5),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBox: {
    borderWidth: scale(1),
    borderRadius: scale(5),
    borderColor: Colors.Main,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
});
export default MusicHeader;
