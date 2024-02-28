import React, { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../utils/Colors';
import { Font } from '../../../utils/font';
import Upload from './Upload';
import Video from './Video';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import CustomButton from '../../../components/CustomButton';
import ConnectionModal from '../../../components/Modal/ConnectionModal';

const Manage = ({ navigation }) => {
  const Data = [
    { title: 'Upload', id: 1 },
    { title: 'Video', id: 2 },
  ];
  const [select, setSelect] = useState(1);

  const handelChange = data => {
    setSelect(data.id);
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
        NoSearch
        BackArrow
        Title
        Text="Manage Podcast/Music Videos"
        TextRestyle={styles.TextRestyle}
      />
      <View style={[GlobalStyle.Row, styles.Row]}>
        {Data?.map(data => (
          <>
            <CustomButton
              data={data}
              key={data.id}
              title={data.title}
              onPress={() => handelChange(data)}
              textStyle={styles.ChangeText}
              containerStyle={[
                styles.containerStyle,
                { backgroundColor: select == data.id ? Colors.Main : '#556084' },
              ]}
            />
          </>
        ))}
      </View>
      {select == 1 && <Upload select={select} setSelect={setSelect} />}
      {select == 2 && <Video />}
      <ConnectionModal />
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
    fontSize: scale(13),
  },
  containerStyle: {
    borderRadius: scale(100),
    height: verticalScale(40),
    width: '32%',
    borderWidth: 0,
  },
});
export default Manage;
