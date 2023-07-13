import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import Upload from './Upload';
import Video from './Video';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const Manage = ({navigation}) => {

  const Data = [
    {title: 'Upload', id: 1},
    {title: 'Video', id: 2},
  ];
  const [select, setSelect] = useState(1);

  const handelChange = (data) => {
    setSelect(data.id)
  };

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification
        BackArrow
        Title
        Text="Manage Podcast/Music Videos"
        TextRestyle={styles.TextRestyle}
      />
      <View style={[GlobalStyle.Row, styles.Row]}>
        {Data?.map((data) => (
          <>
            <TouchableOpacity
              data={data}
              key={data.id}
              activeOpacity={0.8}
              onPress={() => handelChange(data)}
              style={[styles.ChangeBox, {backgroundColor: select == data.id ? Colors.Main : '#556084'}]}>
              <Text style={styles.ChangeText}>{data.title}</Text>
            </TouchableOpacity>
          </>
        ))}
      </View>
        {select == 1 && <Upload select={select} setSelect={setSelect}/>}
        {select == 2 && <Video />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextRestyle: {
    fontFamily: Font.Poppins500,
    fontSize: scale(13),
  },
  Row: {
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
    marginBottom: verticalScale(8),
  },
  ChangeBox: {
    height: verticalScale(40),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
  },
  ChangeText: {
    color: Colors.White,
    fontFamily: Font.Roboto500,
    fontSize: scale(13),
  },
});
export default Manage;
