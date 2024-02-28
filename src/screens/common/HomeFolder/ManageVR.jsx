import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import MainHeader from '../../../components/Header/MainHeader';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utils/Colors';
import UploadLinks from './UploadLinks.jsx';
import VrLinks from './VrLinks.jsx';
import { scale, verticalScale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import ConnectionModal from '../../../components/Modal/ConnectionModal';

const ManageVR = ({navigation}) => {
    const Data = [
        { title: 'Upload', id: 1 },
        { title: 'Links', id: 2 },
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
        Text="Your live stream"
        TextRestyle={styles.TextRestyle}
      />
      <View style={[GlobalStyle.Row, styles.Row]}>
        {Data?.map(data => (
          <>
            <CustomButton
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
      {select == 1 && <UploadLinks select={select} setSelect={setSelect} />}
      {select == 2 && <VrLinks />}
      <ConnectionModal />
    </SafeAreaView>
  )
}

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
})
export default ManageVR
