import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import React, {useCallback} from 'react';

import MainHeader from '../../components/Header/MainHeader';
import SettingItem from '../../components/SettingItem';
import CustomButton from '../../components/CustomButton';

import {Colors} from '../../utils/Colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {USER_DETAILS} from '../../redux/reducer/Holder';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
    }),
  );

  const logOut = async () => {
    await AsyncStorage.removeItem('user_details');
    dispatch({type: USER_DETAILS, payload: null});
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        Notification={true}
        Logo={true}
        source={require('../../assets/image/settings.png')}
        Title={true}
        Text="Setting"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingItem
          onPress={() => navigation.navigate('Profile')}
          Title="Profile"
        />
        <SettingItem
          Title="Notification"
          Notification={30}
          onPress={() => navigation.navigate('Notifications')}
        />
        <SettingItem
          Title="Manage Podcast/Music Videos"
          onPress={() => navigation.navigate('Manage')}
        />
        <SettingItem Title="Start live streaming" />
        <SettingItem
          onPress={() =>
            navigation.navigate('TermsAndConditions', {path: 'user'})
          }
          Title="Terms and conditions"
        />
        <SettingItem Title="Privacy Policy" />
        <SettingItem
          onPress={() => navigation.navigate('LeaderBoard')}
          Title="LeaderBoard"
        />
        {userDetails.social_id ? null : (
          <SettingItem
            onPress={() => navigation.navigate('ChangePassword')}
            Title="Change Password"
          />
        )}
        <SettingItem
          Title="Delete account"
        />

        <View style={{paddingRight: moderateScale(12)}}>
          <CustomButton
            onPress={() => logOut()}
            title="Log Out"
            containerStyle={{marginTop: verticalScale(25)}}
          />
        </View>
        <View style={{height: verticalScale(10)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Setting;
