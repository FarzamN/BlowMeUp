import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useCallback } from 'react';
import {Colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../Constants/GlobalStyle';

const fontScale = Dimensions.get('window').fontScale;
const Alert = ({navigation}) => {
    useFocusEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useCallback(() => {
          navigation.getParent()?.setOptions({
            tabBarStyle: GlobalStyle.HideBar
          })
        }),
      )
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader BackArrow />
      <View style={{paddingHorizontal: moderateScale(20)}}>
        <Text style={styles.Heading}>What&apos;s new</Text>
        <Text
          style={[
            styles.Heading,
            {
              fontSize: scale(13),
              fontFamily: Font.Gilroy500,
              marginTop: verticalScale(5),
            },
          ]}>
          The Latest release from Artists, podcasts and shows you follow
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
          }}>
          <Text
            style={[
              styles.Heading,
              {
                textAlign: 'center',
                fontSize: scale(17),
                fontFamily: Font.Gilroy700,
              },
            ]}>
            We currently do not have any thing new for you
          </Text>

          <Text style={styles.lastText}>
            When There is news, we will post it here. {`\n`}
            Follow your favorite artists and podcasts to stay updated on them
            too.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  Heading: {
    color: Colors.White,
    fontSize: scale(30),
    fontFamily: Font.Gilroy700,
  },
  lastText: {
    textAlign: 'center',
    fontSize: fontScale * scale(12),
    fontFamily: Font.Gilroy700,
    marginTop: '10%',
    marginHorizontal: scale(20),
    color: Colors.White,
  },
});
export default Alert;
