import { FlatList, SafeAreaView, View, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import SongCard from '../../../components/Card/SongCard';
import EmptyCard from '../../../components/Card/EmptyCard';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import {
  show_all_LiveStream,
  show_all_MucisVideo,
  show_all_podcast,
} from '../../../redux/actions/UserAction';
import MainHeader from '../../../components/Header/MainHeader';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import { verticalScale } from 'react-native-size-matters';
import Skeleton from '../../../components/Modal/Skeleton';
import { GenreData } from '../../../Constants/SongData';

const AllVideos = ({ navigation, route }) => {
  const { name } = route.params;
  const [getPodcast, setGetPodcast] = useState('');
  const [getMucisVideo, setGetMucisVideo] = useState('');
  const [getLiveStream, setLiveStream] = useState('');

  const [load, setLoad] = useState('');

  const stream = name === 'Streams';
  const podcast = name === 'podcast';
  const Music = name === 'Music';

  console.log('name', name);
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      show_all_podcast(setGetPodcast, setLoad);
      show_all_MucisVideo(setGetMucisVideo, setLoad);
      show_all_LiveStream(setLiveStream, setLoad);
    }, []),
  );

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        Notification
        Title
        Text={podcast ? 'All PodCast' : 'All Music Videos'}
        BackArrow
      />
      <View style={{ marginLeft: '7%', marginBottom: verticalScale(65) }}>
        {load ? (
          <FlatList showsVerticalScrollIndicator={false}
            data={GenreData}
            numColumns={2}
            key={(item) => item.id}
            renderItem={() => {
              return <Skeleton />
            }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled
            data={Music ? getMucisVideo : podcast ? getPodcast : getLiveStream}
            contentContainerStyle={{ alignSelf: 'center' }}
            numColumns={2}
            ListEmptyComponent={() => {
              return <EmptyCard />;
            }}
            renderItem={({ item }) => {
              return (
                <SongCard
                  data={item}
                  onPress={() => navigation.navigate('SingleVideo', { item: item })}
                />
              );
            }}
          />
        )}
      </View>

      <ConnectionModal />
    </SafeAreaView>
  );
};

export default AllVideos;
