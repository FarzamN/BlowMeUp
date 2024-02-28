import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar,
  View,

} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { Colors } from '../../utils/Colors';

import MainHeader from '../../components/Header/MainHeader';
import ListHeader from '../../components/Header/ListHeader';
import SongCard from '../../components/Card/SongCard';
import GernCard from '../../components/Card/GernCard';
import { useFocusEffect } from '@react-navigation/native';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import {
  all_songs,
  get_profile,
  show_all_MucisVideo,
  show_all_podcast,
  song_id,
} from '../../redux/actions/UserAction';
import DashboardSongCars from '../../components/Card/DashboardSongCars';
import Skeleton from '../../components/Modal/Skeleton';
import { GenreData } from '../../Constants/SongData';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const History = useSelector(state => state.history);
  const [getPodcast, setGetPodcast] = useState('');
  const [getAllSongs, setGetAllSongs] = useState('');
  const [getMucisVideo, setGetMucisVideo] = useState('');
  const [Load, setLoad] = useState(false);
  const slicPodcast = getPodcast.slice(0, 7);
  const GenreDataSliced = GenreData?.slice(0, 7);
  const slicMucisVideo = getMucisVideo.slice(0, 7);
  const slicedGetAllSongs = getAllSongs.slice(0, 7);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
      dispatch(all_songs(setGetAllSongs, setLoad));
      show_all_podcast(setGetPodcast);
      show_all_MucisVideo(setGetMucisVideo);
    }, []),
  );

  const onSearched = item => {
    if (item?.video) {
      navigation.navigate('SingleVideo', { item: item });
    } else {
      dispatch(get_profile(item, navigation, setLoad));
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
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
        <ListHeader
          Title="By Genre"
          Icon
          Text="More"
          onPress={() => navigation.navigate('Genre')}
        />
        <FlatList
          scrollEnabled
          horizontal
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
          data={GenreDataSliced}
          ListHeaderComponent={() => {
            return <View style={{ width: scale(15) }} />;
          }}
          renderItem={({ item }) => {
            return (
              <GernCard
                data={item}
                onPress={() => navigation.navigate('PopularSong', { item: item })}
              />
            );
          }}
        />

        <ListHeader
          Title="Pod Casts"
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
          onPress={() => navigation.navigate('AllVideos', { name: 'Music', data: 'value' })}
        />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slicMucisVideo.reverse()}
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

        {History == null ? null : (
          <>
            <ListHeader Title="Recent" MoreBox={{ backgroundColor: Colors.Non }} />
            <FlatList
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              data={History}
              ListHeaderComponent={() => {
                return <View style={{ width: scale(10) }} />;
              }}
              renderItem={({ item }) => {
                return (
                  <SongCard data={item} onPress={() => onSearched(item)} />
                );
              }}
            />
          </>
        )}
        {/* <ListHeader
          Title="Artists"
          TitleRestyle={{
            fontSize: scale(20),
            fontFamily: Font.Roboto700,
            color: Colors.White,
          }}
          Icon
          Text="More"
        />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DataSliced}
          ListEmptyComponent={() => (
            <>
              <Skeleton ChangeBorderRadius/>
              <Skeleton ChangeBorderRadius/>
              <Skeleton ChangeBorderRadius/>
              <Skeleton ChangeBorderRadius/>
              <Skeleton ChangeBorderRadius/>
            </>
          )}
          ListHeaderComponent={() => {
            return <View style={{width: scale(10)}} />;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => profilePress(item)}>
              <Image
                data={item}
                style={[GlobalStyle.ArtistImage,{marginRight: scale(10),marginTop:verticalScale(10),marginLeft:0}]}
                source={{uri: item.image}}
                
              />
              </TouchableOpacity>
            );
          }}
        /> */}
        <ConnectionModal />
      </ScrollView>
        <View style={{ height: verticalScale(60) }} />
    </SafeAreaView>
  );
};

export default Dashboard;
