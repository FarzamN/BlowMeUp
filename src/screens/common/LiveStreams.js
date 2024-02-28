import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar,
  View,
} from 'react-native';
import React, { useCallback, useState, } from 'react';
import { Colors } from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import ListHeader from '../../components/Header/ListHeader';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import SongCard from '../../components/Card/SongCard';
import {
  show_all_LiveStream,
  show_all_MucisVideo,
  show_all_podcast,
} from '../../redux/actions/UserAction';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Skeleton from '../../components/Modal/Skeleton';
import { verticalScale } from 'react-native-size-matters';

const LiveStreams = ({ navigation }) => {
  const [getPodcast, setGetPodcast] = useState('');
  const [getMucisVideo, setGetMucisVideo] = useState('');
  const [getLiveStream, setLiveStream] = useState('');

  const slicgetLiveStream = getLiveStream.slice(0, 7);
  const slicPodcast = getPodcast.slice(0, 7);
  const slicMucisVideo = getMucisVideo.slice(0, 7);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
      show_all_podcast(setGetPodcast);
      show_all_MucisVideo(setGetMucisVideo);
      show_all_LiveStream(setLiveStream);
    }, []),
  );

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/line.png')}
        Title
        Text="Live Streams"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListHeader
          Title="Live Streams"
          Icon
          Text="More"
          onPress={() => navigation.navigate('AllStreams', { name: 'Streams' })}
        />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slicgetLiveStream}
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
                onPress={() =>
                  navigation.navigate('SingleStream', { item: item })
                }
              />
            );
          }}
        />
        <ListHeader
          Title="Pod Cast"
          Icon
          Text="More"
          onPress={() => navigation.navigate('AllVideos', { name: 'podcast' })}
        />
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
        <ListHeader
          Title="Music Videos"
          Icon
          Text="More"
          onPress={() => navigation.navigate('AllVideos', { name: 'Music' })}
        />
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
      <View style={{ height: verticalScale(50) }} />
      </ScrollView>
      <ConnectionModal />
    </SafeAreaView>
  );
};

export default LiveStreams;
