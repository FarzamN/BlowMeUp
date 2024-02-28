import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import YoutubePlayer from 'react-native-youtube-iframe';
import { UrlRegex } from '../../../utils/url';

const { width, height } = Dimensions.get('window');
const SingleStream = ({ navigation, route }) => {
  const { item } = route.params;
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );


  const youtubeUrl = item?.live_stream;
  const match = youtubeUrl.match(UrlRegex);
  const videoId = match[6];

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ marginTop: '150%' }}>
        <YoutubePlayer resize height={height} width={width} videoId={videoId} />
      </SafeAreaView>
      <ConnectionModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SingleStream;
