import { ScrollView, SafeAreaView, View, Switch } from 'react-native';
import React, { useCallback, useState } from 'react';

import MainHeader from '../../components/Header/MainHeader';
import SettingItem from '../../components/SettingItem';
import CustomButton from '../../components/CustomButton';

import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { Delete_Account, Logout } from '../../redux/actions/AuthActions';
import DeleteModal from '../../components/Modal/DeleteModal';
import { toggle } from '../../redux/actions/UserAction';
import { Colors } from '../../utils/Colors';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Loading from '../../components/Modal/Loading';

const Setting = ({ navigation }) => {
  const [DeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
    }, []),
  );

  const logOut = async () => {
    dispatch(Logout(setLoad))
  };

  const Delete = () => {
    dispatch(Delete_Account());
  };

  const [isEnabled, setIsEnabled] = useState(
    userDetails?.notification_status == 'Active' ? true : false,
  );
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggle();
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/settings.png')}
        Title
        Text="Setting"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingItem
          onPress={() => navigation.navigate('Profile')}
          Title="Profile"
        />
        <SettingItem Title="Notification" Notification>
          <Switch
            trackColor={{ false: '#767577', true: Colors.White }}
            thumbColor={isEnabled ? Colors.Main : 'red'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </SettingItem>

        {userDetails?.role_id == 2 && (
          <>
            <SettingItem
              Title="Manage Podcast/Music Videos"
              onPress={() => navigation.navigate('Manage')}
            />
            <SettingItem
              Title="Manage Image"
              onPress={() => navigation.navigate('ManageImage')}
            />
            <SettingItem
              Title="Start live streaming"
              onPress={() => navigation.navigate('ManageStream')}
            />
            <SettingItem
              Title="Manage Audios"
              onPress={() => navigation.navigate('ManageAudio')}
            />
            <SettingItem
              Title="Manage VR Links"
              onPress={() => navigation.navigate('ManageVR')}
            />
          </>
        )}

        <SettingItem
          onPress={() =>
            navigation.navigate('TermsAndConditions', {
              path: 'user',
              type: 'term',
            })
          }
          Title="Terms and conditions"
        />
        <SettingItem
          onPress={() =>
            navigation.navigate('TermsAndConditions', {
              path: 'user',
              type: 'privacy',
            })
          }
          Title="Privacy Policy"
        />
        <SettingItem
          onPress={() => navigation.navigate('LeaderBoard')}
          Title="Top Fans"
        />
        {userDetails?.social_id ? null : (
          <SettingItem
            onPress={() => navigation.navigate('ChangePassword')}
            Title="Change Password"
          />
        )}
        <SettingItem
          onPress={() => setDeleteModalVisible(true)}
          Title="Delete account"
          Delete
        />

        <View style={{ paddingRight: moderateScale(12) }}>
          <CustomButton
            onPress={() => logOut()}
            title="Log Out"
            containerStyle={{ marginTop: verticalScale(25) }}
          />
        </View>
      </ScrollView>
        <View style={{ height: verticalScale(60) }} />
      <DeleteModal
        visible={DeleteModalVisible}
        OnClose={() => setDeleteModalVisible(false)}
        KeepPress={() => setDeleteModalVisible(false)}
        DeletePress={Delete}
        value="this account"
        account
      />
      <ConnectionModal />
      <Loading isVisible={load} />
    </SafeAreaView>
  );
};

export default Setting;
