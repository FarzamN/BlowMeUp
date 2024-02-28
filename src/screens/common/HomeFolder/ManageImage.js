import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import MainHeader from '../../../components/Header/MainHeader';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utils/Colors';
import { scale, verticalScale } from 'react-native-size-matters';
import UploadImage from './UploadImage';
import Image from './Image';
import ConnectionModal from '../../../components/Modal/ConnectionModal';

const ManageImage = ({ navigation }) => {
  const Data = [
    { title: 'Upload', id: 1 },
    { title: 'Images', id: 2 },
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
      <MainHeader
        NoSearch
        BackArrow
        Title
        Text="Manage Images"
        TextRestyle={GlobalStyle.HeaderSmallText}
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
      {select == 1 && <UploadImage select={select} setSelect={setSelect} />}
      {select == 2 && <Image />}
      <ConnectionModal />
    </SafeAreaView>
  );
};

export default ManageImage;

const styles = StyleSheet.create({
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
