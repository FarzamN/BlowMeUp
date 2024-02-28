import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
};

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: require('./src/assets/audio/music.mp3'),
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
      source:  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    },
    {
      id: '2',
      url: require('./src/assets/audio/music.mp3'),
      title: 'Modern Chillout',
      artist: 'penguinmusic',
      duration: 66,
      source: 'https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg'
    },
    {
      id: '3',
      url: require('./src/assets/audio/music.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
      source: 'https://static.vecteezy.com/system/resources/thumbnails/017/200/664/original/colorful-glowing-music-equalizer-animation-on-black-background-audio-spectrum-music-background-loop-animation-of-equalizer-multicolored-sound-equalizer-animation-nightclub-and-disco-background-free-video.jpg'
    }
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });
}
