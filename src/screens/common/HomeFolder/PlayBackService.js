/* eslint-disable no-unsafe-finally */
import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';

// import {playListData} from './src/constants'
import {music} from '../../../utils/MusicData';

export const setupPlayer = async () => {
  let isSetup = false;
  try {
   await TrackPlayer.getActiveTrack();
    // console.log('trackplayer setup player',trackplayer);
    isSetup = true;
} catch (error) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
};

export const addTrack = async (selectedSong) => {
//   console.log('state',songs);
  
  await TrackPlayer.add(selectedSong);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
};
