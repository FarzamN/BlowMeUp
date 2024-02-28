import { FlatList, SafeAreaView } from 'react-native';
import React, { useCallback, useState } from 'react';
import EmptyCard from '../../../components/Card/EmptyCard';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { show_all_LiveStream } from '../../../redux/actions/UserAction';
import MainHeader from '../../../components/Header/MainHeader';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import { verticalScale } from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';
import { UrlRegex } from '../../../utils/url';

const AllStreams = ({ navigation }) => {
  const [getLiveStream, setLiveStream] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    show_all_LiveStream(setLiveStream);
    setRefreshing(false);
  };
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      show_all_LiveStream(setLiveStream);
    }, []),
  );

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader Notification Title Text={'All Live Streams'} BackArrow />
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={getLiveStream}
        keyExtractor={getLiveStream.id}
        ListEmptyComponent={() => {
          return <EmptyCard />;
        }}
        renderItem={({ item, index }) => {
          console.log('index', index);
          const youtubeUrl = getLiveStream[index]?.live_stream;

          const match = youtubeUrl.match(UrlRegex);
          console.log('match', match);
          const VideoId = match[6];
          return (
            <YoutubePlayer height={verticalScale(200)} videoId={VideoId} />
          );
        }}
      />
      <ConnectionModal />
    </SafeAreaView>
  );
};

export default AllStreams;
