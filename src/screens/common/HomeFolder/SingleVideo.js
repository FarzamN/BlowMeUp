import { StyleSheet, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import VideoPlater from 'react-native-mo-video-player';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import ConnectionModal from '../../../components/Modal/ConnectionModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SingleVideo = ({ navigation, route }) => {
  const { item } = route.params;
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );

  useEffect(() => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    StatusBar.setTranslucent(true);

    return () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
      StatusBar.setTranslucent(false);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <VideoPlater
        style={styles.video}
        title={item.video_title}
        poster={item.img}
        source={{
          uri: item.video,
        }}
        showCoverButton={false}
        autoPlay={true}
        playInBackground={false}
        showFullScreenButton={false}
      />

      <ConnectionModal />
    </SafeAreaView>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: {
    width: WIDTH,
    height: HEIGHT,
  },
});
