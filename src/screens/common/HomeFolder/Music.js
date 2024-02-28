// react native sound is start from here ====================================

import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MusicHeader from '../../../components/Header/MusicHeader';
import { Font } from '../../../utils/font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useSelector } from 'react-redux';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import TrackPlayer, {
  usePlaybackState,
  State,
  useProgress,
} from 'react-native-track-player';
import { addTrack, setupPlayer } from './PlayBackService';
import Loading from '../../../components/Modal/Loading';
import { useFocusEffect } from '@react-navigation/native';

const W = Dimensions.get('window').width;

const Music = ({ navigation, route }) => {
  const selectedSong = route.params.item

  console.log('selectedSong ===>', selectedSong)


  const [track, setTrack] = useState();

  const songs = useSelector(state => state.songs);
  const [position, setPosition] = useState(0);
  const { position: trackPosition, duration } = useProgress();

  const onSliderChange = newValue => {
    setPosition(newValue);
  };

  const onSlidingComplete = async value => {
    await TrackPlayer.seekTo(value);
  };

  const playBackState = usePlaybackState();

  const [isPlayerReady, setIsPaylerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();

    console.log('isSetup', isSetup);
    if (isSetup) {
      await addTrack(selectedSong);
      setTimeout(async () => {
        await addTrack(songs);
        console.log('set time out');
      }, 100);
    }
    setIsPaylerReady(isSetup);
  }

  useEffect(() => {
    setup();
    return () => {
      console.log('stop');
      TrackPlayer.reset();
    };
  }, []);

  TrackPlayer.addEventListener('playback-track-changed', async event => {
    const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
    setTrack(currentTrack);
  });

  const playSound = async playback => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    console.log('currentTrack', currentTrack);
    setTrack(currentTrack);

    if (currentTrack !== null) {
      console.log('if currentTrack', currentTrack);
      if (playback.state === State.Paused || playback.state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  const previous = async () => {
    await TrackPlayer.skipToPrevious();

  };

  const next = async () => {
    await TrackPlayer.skipToNext();
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MusicHeader />

      <View style={{ justifyContent: 'center' }}>
        <Image
          style={{
            position: 'absolute',
            width: '100%',
          }}
          source={require('../../../assets/image/wave.png')}
        />

        <View
          style={[
            styles.ImageBox,
            {
              width: '60%',
            },
          ]}>
          <Image
            source={{ uri: track?.artwork?.toString() }}
            style={styles.Image}
          />
        </View>
      </View>
      <Text style={styles.SongName}>{track?.title}</Text>
      <Text style={styles.Name}>{track?.artist}</Text>

      <Slider
        style={{ width: '100%', marginVertical: verticalScale(20) }}
        value={trackPosition}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor={Colors.White}
        maximumTrackTintColor={Colors.Main}
        thumbTintColor={Colors.Main}
        onValueChange={onSliderChange}
        onSlidingComplete={onSlidingComplete}
      />
      <View style={{ paddingHorizontal: moderateScale(20) }}>
        <View style={[GlobalStyle.Row, { justifyContent: 'space-between' }]}>
          <Text style={styles.Time}>
            {new Date(trackPosition * 500).toISOString().substring(15, 19)}
          </Text>

          <Text style={styles.Time}>
            {new Date((duration - trackPosition) * 500)
              .toISOString()
              .substring(15, 19)}
          </Text>
        </View>
        <View style={[GlobalStyle.Row, { justifyContent: 'space-around' }]}>
          <Ionicons name="ios-shuffle" size={scale(25)} color={Colors.Non} />
          <TouchableOpacity onPress={previous}>
            <FontAwesome5
              name="step-backward"
              size={scale(25)}
              color={Colors.White}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendVoice}
            onPress={() => playSound(playBackState)}>
            <Ionicons
              name={playBackState.state === State.Playing ? 'pause' : 'md-play'}
              color={Colors.White}
              size={scale(25)}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={next}>
            <FontAwesome5
              name="step-forward"
              size={scale(25)}
              color={Colors.White}
            />
          </TouchableOpacity>
          <MaterialIcons name="loop" size={scale(21)} color={Colors.Non} />
        </View>
      </View>
      <ConnectionModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(360),
  },
  ImageBox: {
    aspectRatio: 1 / 1,
    borderRadius: scale(360),
    alignSelf: 'center',
    marginTop: W * 0.2,
    borderWidth: scale(7),
    borderColor: Colors.ThemeOrange,
  },

  SongName: {
    color: Colors.White,
    fontFamily: Font.Gilroy700,
    fontSize: W * 0.09,
    textAlign: 'center',
    marginTop: W * 0.14,
  },
  Name: {
    color: '#A9A9A9',
    fontFamily: Font.Inter400,
    fontSize: W * 0.05,
    textAlign: 'center',
  },
  Time: {
    fontFamily: Font.Gilroy600,
    fontSize: scale(13),
    color: Colors.Main,
  },
  sendVoice: {
    backgroundColor: '#F93420',
    height: scale(50),
    width: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingLeft: 2,
  },
});
export default Music;
