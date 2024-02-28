import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utils/Colors';
import MainHeader from '../../../components/Header/MainHeader';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { BaseUrl, token } from '../../../utils/url';
import RenderHtml from 'react-native-render-html';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import Loading from '../../../components/Modal/Loading';
import { Font } from '../../../utils/font';

const TermsAndConditions = ({ navigation, route }) => {
  const { path, type } = route.params;
  const WhatToShow = type == 'term' ? 'Terms and Conditions' : 'Privacy';
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = Dimensions.get('window');
  const onSubmit = () => {
    navigation.goBack();
  };

  const getHtml = async () => {
    setLoading(true);
    try {
      let base_url = `${BaseUrl}show-setting`;
      let myData = new FormData();

      myData.append('token', token);
      myData.append('type', WhatToShow);

      const response = await fetch(base_url, {
        body: myData,
        method: 'post',
      });
      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setData(responseData.success.data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      getHtml();
    }, []),
  );

  let result = data?.description?.replace(
    /<div(.*?)>/gi,
    `<div style='color: ${Colors.White};font-family: ${Font.Poppins500
    }; font-size: ${'15px'};'>`,
  );

  const source = {
    html: result,
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <View
        style={{
          marginTop:
            path == 'auth' ? StatusBar.currentHeight + verticalScale(10) : 0,
        }}>
        <MainHeader
          NoSearch
          BackArrow
          Title
          Text={type !== 'term' ? 'Privacy Policy' : 'Terms and Conditions'}
        />
      </View>
      <View style={styles.MainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: verticalScale(100),
              width: '100%',
              alignSelf: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/image/logo.png')}
              style={GlobalStyle.Image}
            />
          </View>
          <RenderHtml contentWidth={width} source={source} />

          <CustomButton
            onPress={onSubmit}
            title="Accept and Continue"
            containerStyle={{
              width: '85%',
              alignSelf: 'center',
              marginBottom: verticalScale(20),
            }}
          />
          <ConnectionModal />
          <Loading isVisible={loading} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainView: {
    width: '90%',
    height: '90%',
    backgroundColor: Colors.Ash,
    borderRadius: scale(20),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
  },
});
export default TermsAndConditions;
