import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import { Colors } from '../../../utils/Colors';
import { scale, verticalScale } from 'react-native-size-matters';
import Today from './Today';
import Week from './Week';
import Month from './Month';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import ConnectionModal from '../../../components/Modal/ConnectionModal';

const LeaderBoard = ({ navigation }) => {
  const [select, setSelect] = useState(1);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );
  const Data = [
    { date: 'Today', id: 1 },
    { date: 'Week', id: 2 },
    { date: 'Month', id: 3 },
  ];

  const HandleData = item => {
    setSelect(item.id);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader BackArrow Notification Title Text={'Top Fans'} />
      <View style={[GlobalStyle.Row, { justifyContent: 'center' }]}>
        {Data.map((item, index) => {
          return (
            <TouchableOpacity
              data={item}
              key={index}
              onPress={() => HandleData(item)}
              activeOpacity={0.6}
              style={[
                styles.Change_back_Box,
                { backgroundColor: select == item.id ? '#393F51' : Colors.Non },
              ]}>
              <Text style={styles.ChangeColorsText}>{item.date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {select == 1 && <Today />}
      {select == 2 && <Week />}
      {select == 3 && <Month />}
      <ConnectionModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Change_back_Box: {
    marginRight: scale(10),
    width: scale(80),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
});
export default LeaderBoard;
