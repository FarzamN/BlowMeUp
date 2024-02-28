import React from 'react';

import { StyleSheet, Image, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ArtistDashboard from '../screens/artist/ArtistDashboard';
import PictureSection from '../screens/common/PictureSection';
import LiveStreams from '../screens/common/LiveStreams';
import VlogSection from '../screens/common/VlogSection';
import Setting from '../screens/common/Setting';

import Search from '../screens/common/Search';
import AllVrLinks from '../screens/common/AllVrLinks';

import PopularSong from '../screens/common/HomeFolder/PopularSong';
import Manage from '../screens/common/HomeFolder/Manage';
import ManageImage from '../screens/common/HomeFolder/ManageImage';
import ManageVR from '../screens/common/HomeFolder/ManageVR';
import ManageStream from '../screens/common/HomeFolder/ManageStream';
import ManageAudio from '../screens/common/HomeFolder/ManageAudio';
import PlayAll from '../screens/common/HomeFolder/PlayAll';
import Music from '../screens/common/HomeFolder/Music';
import Profile from '../screens/common/SettingFolder/Profile';
import LeaderBoard from '../screens/common/SettingFolder/LeaderBoard';
import SearchScreen from '../screens/common/SearchScreen';
import Alert from '../screens/common/Alert';
import ChangePassword from '../screens/common/SettingFolder/ChangePassword';
import TermsAndConditions from '../screens/common/SettingFolder/TermsAndConditions';
import SingleVideo from '../screens/common/HomeFolder/SingleVideo';
import EditVideo from '../screens/common/HomeFolder/EditVideo';
import AllVideos from '../screens/common/HomeFolder/AllVideos';
import EditImage from '../screens/common/HomeFolder/EditImage';
import EditAudio from '../screens/common/HomeFolder/EditAudio';
import EditVrLink from '../screens/common/HomeFolder/EditVrLink';
import EditStream from '../screens/common/HomeFolder/EditStream';
import AllStreams from '../screens/common/HomeFolder/AllStreams';
import SingleStream from '../screens/common/HomeFolder/SingleStream';

import Instagram from '../screens/common/HomeFolder/Instagram.js';

const ArtistNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="dashboard"
          component={AllDashboard}
          options={{
            tabBarIcon: ({ focused }) =>
              <View style={styles.ImageBox}>
                <Image
                  style={styles.Image}
                  source={focused ? require('../assets/image/home.png') : require('../assets/image/homedeactive.png')}
                />
              </View>
          }}
        />
        <Tab.Screen
          name="AllPic"
          component={AllPic}
          options={{
            tabBarIcon: ({ focused }) =>
              <View style={styles.ImageBox}>
                <Image
                  style={styles.Image}
                  source={focused ? require('../assets/image/photo.png') : require('../assets/image/photodeactive.png')}
                />
              </View>
          }}
        />
        <Tab.Screen
          name="AllStream"
          component={AllStream}
          options={{
            tabBarIcon: ({ focused }) =>
              <View style={styles.ImageBox}>
                <Image
                  style={styles.Image}
                  source={focused ? require('../assets/image/line.png') : require('../assets/image/linedeactive.png')}
                />
              </View>
          }}
        />

        <Tab.Screen
          name="AllVlog"
          component={AllVlog}
          options={{
            tabBarIcon: ({ focused }) =>
              <View style={styles.ImageBox}>
                <Image
                  style={styles.Image}
                  source={focused ? require('../assets/image/video.png') : require('../assets/image/videodeactive.png')}
                />
              </View>
          }}
        />
        <Tab.Screen
          name="AllSetting"
          component={AllSetting}
          options={{
            tabBarIcon: ({ focused }) =>
              <View style={styles.ImageBox}>
                <Image
                  style={styles.Image}
                  source={focused ? require('../assets/image/settings.png') : require('../assets/image/settingsdeactive.png')}
                />
              </View>
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  Image: {
    width: scale(23),
    height: scale(23),
    resizeMode: 'contain',
  },
  ImageBox: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,

    backgroundColor: '#3D4663',
  },
});
export default ArtistNavigator;

const Stack = createNativeStackNavigator();

function AllDashboard() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
      initialRouteName="ArtistDashboard">
      <Stack.Screen
        name="Instagram"
        component={Instagram}
      />
      <Stack.Screen
        name="ArtistDashboard"
        component={ArtistDashboard}
      />
      <Stack.Screen
        name="Search"
        component={Search}
      />
      <Stack.Screen
        name="Alert"
        component={Alert}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <Stack.Screen
        name="allVrLinks"
        component={AllVrLinks}
        options={{ animation: 'flip' }}
      />
      <Stack.Screen
        name="PopularSong"
        component={PopularSong}
      />

      <Stack.Screen
        name="PlayAll"
        component={PlayAll}
      />
      <Stack.Screen
        name="Music"
        component={Music}
      />
      <Stack.Screen
        name="Manage"
        component={Manage}
      />
      <Stack.Screen
        name="SingleVideo"
        component={SingleVideo}
      />
      <Stack.Screen
        name="AllVideos"
        component={AllVideos}
      />
      <Stack.Screen
        name="ManageStream"
        component={ManageStream}
      />
       <Stack.Screen
        name="EditImage"
        component={EditImage}
      />
    </Stack.Navigator>
  );
}

function AllPic() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
      initialRouteName="PictureSection">
      <Stack.Screen
        name="PictureSection"
        component={PictureSection}
      />

      <Stack.Screen
        name="ManageImage"
        component={ManageImage}
      />
       <Stack.Screen
        name="EditImage"
        component={EditImage}
      />
    </Stack.Navigator>
  );
}

function AllStream() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LiveStreams">
      <Stack.Screen
        name="LiveStreams"
        component={LiveStreams}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="AllVideos"
        component={AllVideos}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="PlayAll"
        component={PlayAll}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="AllStreams"
        component={AllStreams}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SingleStream"
        component={SingleStream}
        options={{ animation: 'slide_from_right' }}
      />
       <Stack.Screen
        name="EditImage"
        component={EditImage}
      />
    </Stack.Navigator>
  );
}

function AllVlog() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'flip' }}
      initialRouteName="VlogSection">
      <Stack.Screen
        name="VlogSection"
        component={VlogSection}
      />
      <Stack.Screen
        name="Manage"
        component={Manage}
      />
      <Stack.Screen
        name="PlayAll"
        component={PlayAll}
      />
       <Stack.Screen
        name="EditImage"
        component={EditImage}
      />
    </Stack.Navigator>
  );
}

function AllSetting() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'flip' }}
      initialRouteName="Setting">
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ animation: 'slide_from_left' }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="LeaderBoard"
        component={LeaderBoard}
      />
      <Stack.Screen
        name="Manage"
        component={Manage}
      />
      <Stack.Screen
        name="ManageImage"
        component={ManageImage}
      />
      <Stack.Screen
        name="ManageVR"
        component={ManageVR}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <Stack.Screen
        name="ManageStream"
        component={ManageStream}
      />
      <Stack.Screen
        name="ManageAudio"
        component={ManageAudio}
      />
      <Stack.Screen
        name="EditVideo"
        component={EditVideo}
      />
      <Stack.Screen
        name="EditImage"
        component={EditImage}
      />
      <Stack.Screen
        name="EditAudio"
        component={EditAudio}
      />
      <Stack.Screen
        name="EditVrLink"
        component={EditVrLink}
      />
      <Stack.Screen
        name="EditStream"
        component={EditStream}
      />
    </Stack.Navigator>
  );
}
