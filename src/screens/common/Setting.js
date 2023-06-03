import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import React, { useCallback } from 'react';

import MainHeader from '../../components/Header/MainHeader';
import SettingItem from '../../components/SettingItem';
import CustomButton from '../../components/CustomButton';

import {Colors} from '../../utils/Colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {USER_DETAILS} from '../../redux/reducer/Holder';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../Constants/GlobalStyle';

const Setting = ({navigation}) => {
  const Dispatch = useDispatch();
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar
      })
    }),
  )
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        Notification={true}
        Logo={true}
        source={require('../../assets/image/settings.png')}
        Title={true}
        Text="Setting"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal:moderateScale(15)}}>
        <SettingItem
          onPress={() => navigation.navigate('Profile')}
          Title="Profile"
        />
        <SettingItem
          Title="Notification"
          Notificatin={true}
          onPress={() => navigation.navigate('Notifications')}
        />
        <SettingItem
          Title="Manage Podcast/Music Videos"
          onPress={() => navigation.navigate('Manage')}
        />
        <SettingItem Title="Start live streaming" />
        <SettingItem
          onPress={() => navigation.navigate('TermsAndConditions',{type: 'user'})}
          Title="Terms and conditions"
        />
        <SettingItem Title="Privacy Policy" />
        <SettingItem
          onPress={() => navigation.navigate('LeaderBoard')}
          Title="LeaderBoard"
        />
        <SettingItem
          onPress={() => navigation.navigate('ChangePassword')}
          Title="Change Password"
        />
        <View style={{paddingRight: moderateScale(12)}}>
          <CustomButton
            onPress={() => Dispatch({type: USER_DETAILS, payload: null})}
            title="Log Out"
            containerStyle={{marginTop: verticalScale(25)}}
          />
        </View>
        </View>
        <View style={{height: verticalScale(10)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
});

export default Setting;
