import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { show_own_video } from '../../../redux/actions/UserAction';

import VideoCard from '../../../components/Card/VideoCard';
import EmptyCard from '../../../components/Card/EmptyCard';
import BigSkeleton from '../../../components/Modal/BigSkeleton';
import { GeneratoinItem } from '../../../Constants/SongData';

const Video = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [VideoData, setVideoData] = useState('');
  const [load, setLoad] = useState(false);

  useFocusEffect(
    useCallback(() => {
      show_own_video(setVideoData, setLoad)
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    show_own_video(setVideoData, setLoad)
    setRefreshing(false);
  };
  return load ? <>
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={GeneratoinItem}
        renderItem={() => <BigSkeleton />}
      />

    </>
  </> : (
    <>
      <FlatList
        scrollEnabled
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        data={VideoData}
        keyExtractor={VideoData.id}
        ListEmptyComponent={() => <EmptyCard />}
        renderItem={({ item }) => <VideoCard key={item.id} data={item} LikeWork={false} />}
      />
    </>
  );
};

export default Video;
