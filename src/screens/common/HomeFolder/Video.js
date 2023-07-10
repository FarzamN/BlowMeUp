import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {show_own_video} from '../../../redux/actions/UserAction';

import VideoCard from '../../../components/Card/VideoCard';
import EmptyCard from '../../../components/Card/EmptyCard';

const Video = () => {
  const [VideoData, setVideoData] = useState('');

  useFocusEffect(
    useCallback(() => {
      show_own_video(setVideoData);
    }, []),
  );
  return (
    <>
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        data={VideoData}
        keyExtractor={VideoData.id}
        ListEmptyComponent={() => {
          return <EmptyCard />;
        }}
        renderItem={({item}) => {
          return <VideoCard key={item.id} data={item} LikeWork={false}/>
       }}
      />
    </>
  );
};

export default Video;
