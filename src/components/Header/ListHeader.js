import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {useNavigation} from '@react-navigation/native';

const ListHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={[GlobalStyle.Row, styles.container]}>
      <View style={GlobalStyle.Row}>
        {props.Logo ? (
          <Image style={styles.Image} source={props.source} />
        ) : null}
        <Text style={[styles.Title, props.TitleRestyle]}>{props.Title}</Text>
      </View>

      {props.Upload ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Manage')}
          style={styles.MoreBox}>
          <Text style={styles.Text}>Upload</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[GlobalStyle.Row, styles.MoreBox,props.MoreBox]}>
          <Text style={styles.Text}>{props.Text}</Text>
          {props.Icon ? (
            <AntDesign
              name="rightcircleo"
              color={Colors.Black}
              size={scale(15)}
              style={{marginLeft: scale(7)}}
            />
          ) : null}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    paddingHorizontal: moderateScale(10),
  },
  Image: {
    width: scale(22),
    height: verticalScale(22),
    marginRight: scale(10),
  },
  Title: {
    fontSize: scale(15),
    fontFamily: Font.Poppins600,
    color: Colors.White,
  },
  Text: {
    color: Colors.Black,
    fontSize: scale(12),
    fontFamily: Font.Poppins500,
    top: verticalScale(1),
  },
  MoreBox: {
    backgroundColor: Colors.White,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(5),
    borderRadius: scale(20),
  },
});

export default ListHeader;
