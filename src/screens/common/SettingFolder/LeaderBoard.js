import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import {Colors} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../../utils/font';
import Today from './Today';
import Week from './Week';
import Month from './Month';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
const LeaderBoard = ({navigation}) => {
  const [today, setToday] = useState(true);
  const [week, setWeek] = useState(false);
  const [month, setMonth] = useState(false);

  const [todayColor, setTodayColot] = useState('#393F51');
  const [weekColor, setWeekColor] = useState(Colors.ThemeBlue);
  const [monthColor, setMonthColor] = useState(Colors.ThemeBlue);

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar
      })
    }),
  )
  const HandleToday = () => {
    setToday(true);
    setWeek(false);
    setMonth(false);
    setTodayColot('#393F51');
    setWeekColor(Colors.ThemeBlue);
    setMonthColor(Colors.ThemeBlue);
  };
  const HandletWeek = () => {
    setToday(false);
    setWeek(true);
    setMonth(false);
    setTodayColot(Colors.ThemeBlue);
    setWeekColor('#393F51');
    setMonthColor(Colors.ThemeBlue);
  };
  const HandletMonth = () => {
    setToday(false);
    setWeek(false);
    setMonth(true);
    setTodayColot(Colors.ThemeBlue);
    setWeekColor(Colors.ThemeBlue);
    setMonthColor('#393F51');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader BackArrow={true} Title={true} Text={'LeaderBoard'} />
      <View style={[styles.Row, {justifyContent: 'center'}]}>
        <TouchableOpacity
          onPress={() => HandleToday()}
          activeOpacity={0.6}
          style={[styles.ChagebackBox, {backgroundColor: todayColor}]}>
          <Text style={styles.ChangeColorsText}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => HandletWeek()}
          activeOpacity={0.6}
          style={[styles.ChagebackBox, {backgroundColor: weekColor}]}>
          <Text style={styles.ChangeColorsText}>Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => HandletMonth()}
          activeOpacity={0.6}
          style={[styles.ChagebackBox, {backgroundColor: monthColor}]}>
          <Text style={styles.ChangeColorsText}>Month</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.Row,
          {justifyContent: 'space-evenly', marginTop: verticalScale(10)},
        ]}>
        <View>
          <View style={[styles.imageBox, {borderColor: Colors.ThemeCream}]}>
            <Image
              style={styles.Image}
              resizeMode="cover"
              source={require('../../../assets/image/leader2.jpg')}
            />
            <View
              style={[styles.NumberBox, {backgroundColor: Colors.ThemeCream}]}>
              <Text style={styles.Number}>2</Text>
            </View>
          </View>
          <Text style={styles.Name}>Vantani</Text>
          <Text style={styles.Level}>Level 3</Text>
        </View>
        <View>
          <View style={styles.CrownBox}>
            <Image
              resizeMode="contain"
              style={[styles.Image, {borderRadius: null}]}
              source={require('../../../assets/image/crawn.png')}
            />
          </View>
          <View
            style={[
              styles.imageBox,
              styles.imageBoxWinner,
              {borderColor: Colors.LightYellow},
            ]}>
            <Image
              style={styles.Image}
              resizeMode="cover"
              source={require('../../../assets/image/leader1.jpg')}
            />
            <View
              style={[styles.NumberBox, {backgroundColor: Colors.LightYellow}]}>
              <Text style={styles.Number}>2</Text>
            </View>
          </View>
          <Text style={styles.Name}>Vantani</Text>
          <Text style={styles.Level}>Level 3</Text>
        </View>
        <View>
          <View style={[styles.imageBox, {borderColor: Colors.ThemeOrange}]}>
            <Image
              style={styles.Image}
              resizeMode="cover"
              source={require('../../../assets/image/leader3.jpg')}
            />
            <View
              style={[styles.NumberBox, {backgroundColor: Colors.ThemeOrange}]}>
              <Text style={styles.Number}>2</Text>
            </View>
          </View>
          <Text style={styles.Name}>Vantani</Text>
          <Text style={styles.Level}>Level 3</Text>
        </View>
      </View>
      {today && <Today />}
      {week && <Week />}
      {month && <Month />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ChagebackBox: {
    marginRight: scale(10),
    width: scale(80),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
  ChangeColorsText: {
    color: Colors.White,
    fontFamily: Font.Nats,
    fontSize: scale(13),
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(100),
  },
  imageBox: {
    width: scale(70),
    height: scale(70),
    borderWidth: scale(3),
    borderRadius: scale(100),
    marginTop: verticalScale(50),
  },
  imageBoxWinner: {
    width: scale(110),
    height: scale(110),
    marginHorizontal: scale(7),
    marginTop: verticalScale(-15),
  },
  NumberBox: {
    width: scale(25),
    height: scale(25),
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: verticalScale(-10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(2),
    borderColor: Colors.ThemeBlue,
  },
  Number: {
    color: Colors.ThemeBlue,
    fontFamily: Font.Nats,
    fontSize: scale(13),
    lineHeight: verticalScale(22),
  },
  CrownBox: {
    justifyContent: 'center',
    borderWidth: null,
    borderRadius: null,
    alignSelf: 'center',
    width: scale(75),
    height: verticalScale(60),
    zIndex: 9,
  },
  Name: {
    color: Colors.White,
    fontSize: scale(12),
    fontFamily: Font.Nats,
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  Level: {
    color: '#BDBFC5',
    fontSize: scale(10),
    textAlign: 'center',
    fontFamily: Font.Nats,
    marginTop: verticalScale(10),
  },
});
export default LeaderBoard;
