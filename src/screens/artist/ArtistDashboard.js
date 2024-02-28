import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { Colors } from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import ListHeader from '../../components/Header/ListHeader';
import SongCard from '../../components/Card/SongCard';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import {
  all_songs,
  show_all_MucisVideo,
  show_all_podcast,
} from '../../redux/actions/UserAction';
import Skeleton from '../../components/Modal/Skeleton';
import DashboardSongCars from '../../components/Card/DashboardSongCars';
import { scale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import ConnectionModal from '../../components/Modal/ConnectionModal';

const ArtistDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [getPodcast, setGetPodcast] = useState('');
  const [getMucisVideo, setGetMucisVideo] = useState('');
  const [getAllSongs, setGetAllSongs] = useState('');
  const [Load, setLoad] = useState(false);
  const slicPodcast = getPodcast.slice(0, 7);
  const slicMucisVideo = getMucisVideo.slice(0, 7);
  const slicedGetAllSongs = getAllSongs.slice(0, 7);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
      show_all_podcast(setGetPodcast);
      show_all_MucisVideo(setGetMucisVideo);
      dispatch(all_songs(setGetAllSongs, setLoad));
    }, []),
  );

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar
        backgroundColor={Colors.ThemeBlue}
        barStyle={'light-content'}
      />
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/home.png')}
        Title
        Text="Dashboard"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListHeader
          Logo
          Text="LIVE NOW"
          source={require('../../assets/image/line.png')}
          Title="Live Stream"
          onPress={() => navigation.navigate('ManageStream')}
        />
        <ListHeader
          Logo
          Icon
          Text="More"
          source={require('../../assets/image/fire.png')}
          Title="Popular Song"
          onPress={() => navigation.navigate('PopularSong', { item: 'allSongs' })}
        />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slicedGetAllSongs}
          ListEmptyComponent={() => (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          ListHeaderComponent={() => {
            return <View style={{ width: scale(10) }} />;
          }}
          renderItem={({ item, index }) => {
            return (
              <DashboardSongCars
                data={item}
                onPress={() =>
                  navigation.navigate('Music', {
                    index: index,
                    item: item,
                  })
                }
              />
            );
          }}
        />

        <ListHeader Title="Pod Casts" Upload />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slicPodcast}
          ListHeaderComponent={() => {
            return <View style={GlobalStyle.Move} />;
          }}
          ListEmptyComponent={() => (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          renderItem={({ item }) => {
            return (
              <SongCard
                data={item}
                onPress={() => navigation.navigate('SingleVideo', { item: item })}
              />
            );
          }}
        />
        <ListHeader Title="Music Videos" Upload />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slicMucisVideo}
          ListHeaderComponent={() => {
            return <View style={GlobalStyle.Move} />;
          }}
          ListEmptyComponent={() => (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          renderItem={({ item }) => {
            return (
              <SongCard
                data={item}
                onPress={() => navigation.navigate('SingleVideo', { item: item })}
              />
            );
          }}
        />
        <ConnectionModal />
      </ScrollView>
      <View style={{ height: verticalScale(60) }} />
    </SafeAreaView>
  );
};

export default ArtistDashboard;
