import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setupPlayer, addTracks} from '../../../../trackPlayerServices';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import MusicHeader from '../../../components/Header/MusicHeader';

function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return (
    <View>
      <Image resizeMode='contain' style={{width:100,height:100}} source={{uri: info.source}}/>
      <Text style={styles.songTitle}>{info.title}</Text>
      <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}

function TrackProgress() {
  const {position, duration} = useProgress(200);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View>
      <Text style={styles.trackProgress}>
        {format(position)} / {format(duration)}
      </Text>
    </View>
  );
}

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
    }
  });

  function PlaylistItem({index, title, isCurrent}) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <>
      <TouchableOpacity onPress={handleItemPress}>
        <Text
          style={{
            ...styles.playlistItem,
            ...{backgroundColor: isCurrent ? '#666' : 'transparent'},
          }}>
          {title}
        </Text>
      </TouchableOpacity>
      </>
    );
  }

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();
  }

  return (
    <View>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.title}
              isCurrent={currentTrack == index}
            />
          )}
        />
      </View>
      <Controls onShuffle={handleShuffle} />
    </View>
  );
}

function Controls({onShuffle}) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View
      style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      <Icon.Button
        name="arrow-left"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToPrevious()}
      />
      <Icon.Button
        name={playerState == State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="arrow-right"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToNext()}
      />
      <Icon.Button
        name="random"
        size={28}
        backgroundColor="transparent"
        onPress={onShuffle}
      />
    </View>
  );
}

function Music() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MusicHeader />
      <Header />
      <TrackProgress />
      <Playlist />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
  songTitle: {
    fontSize: 32,
    marginTop: 50,
    // color: '#ccc',
    color:'red'
  },
  artistName: {
    fontSize: 24,
    color: '#888',
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },
});

export default Music;

// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   StatusBar,
//   useWindowDimensions,
//   FlatList,
// } from 'react-native';
// import Slider from '@react-native-community/slider';
// import React, {useState} from 'react';
// import {Colors} from '../../../utils/Colors';
// import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
// import MusicHeader from '../../../components/Header/MusicHeader';
// import {Font} from '../../../utils/font';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Sound from 'react-native-sound';
// import {GlobalStyle} from '../../../Constants/GlobalStyle';
// import { SongData } from '../../../Constants/SongData';

// const W = Dimensions.get('window').width;
// const H = Dimensions.get('window').height;

// const Music = ({route}) => {
//   const {data} = route.params;
//   console.log('data ---->', data);
//   const {width, height} = useWindowDimensions();
//   const [playing, setPlaying] = useState(false);
//   const [sound, setSound] = useState(null);

//   const playSound = () => {
//     Sound.setCategory('Playback');
//     const sound = new Sound('music.mp3', Sound.MAIN_BUNDLE, error => {
//       if (error) {
//         console.log('failed to load the sound', error);
//         return;
//       }
//       // loaded successfully
//       console.log(
//         'duration in seconds: ' +
//           sound.getDuration() +
//           'number of channels: ' +
//           sound.getNumberOfChannels(),
//       );
//       sound.play(() => {
//         // Release when done
//         sound.release();
//         setPlaying(false);
//         console.log('Sound finished playing');
//       });
//     });
//     setSound(sound);
//     setPlaying(true);
//   };

//   const stopSound = () => {
//     if (sound) {
//       sound.stop();
//       sound.release();
//     }
//     setPlaying(false);
//   };

//   return (
// <SafeAreaView style={GlobalStyle.Container}>
//   <StatusBar backgroundColor={Colors.ThemeBlue} />
//       <MusicHeader />
//       <View style={{justifyContent: 'center'}}>
//         <Image
//           style={{
//             position: 'absolute',
//             width: '100%',
//           }}
//           source={require('../../../assets/image/wave.png')}
//         />
//         <FlatList
//           scrollEnabled
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           data={SongData}
//           renderItem={({data,id}) => {
//             return (
//               <View
//                 style={[
//                   styles.ImageBox,
//                   {width: width <= 450 && height <= 700 ? W * 0.6 : W * 0.7},
//                 ]}>
//                 <Image source={route.params.data.source} style={styles.Image} />
//               </View>
//             );
//           }}
//         />
//       </View>
//       <View style={{paddingHorizontal: moderateScale(20)}}>
//         <Text style={styles.SongName}>{data.SongName}</Text>
//         <Text style={styles.Name}>{data.Name}</Text>

//         <Slider
//           style={{width: '100%', marginVertical: verticalScale(20)}}
//           minimumValue={0}
//           maximumValue={1}
//           minimumTrackTintColor={Colors.White}
//           maximumTrackTintColor={Colors.Main}
//           thumbTintColor={Colors.Main}
//         />
//         <View style={[GlobalStyle.Row, {justifyContent: 'space-between'}]}>
//           <Text style={styles.Time}>1:39</Text>
//           <Text style={styles.Time}>4:12</Text>
//         </View>
//         <View style={[GlobalStyle.Row, {justifyContent: 'space-around'}]}>
//           <Ionicons
//             name="ios-shuffle"
//             size={scale(25)}
//             color={Colors.Grey}
//           />
//           <FontAwesome5
//             name="step-backward"
//             size={scale(25)}
//             color={Colors.White}
//           />

//           {playing ? (
//             <TouchableOpacity style={styles.sendVoice} onPress={stopSound}>
//               <Ionicons name="pause" color={Colors.White} size={scale(25)} />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity style={styles.sendVoice} onPress={playSound}>
//               <Ionicons name="md-play" color={Colors.White} size={scale(25)} />
//             </TouchableOpacity>
//           )}
//           <FontAwesome5
//             name="step-forward"
//             size={scale(25)}
//             color={Colors.White}
//           />
//           <MaterialIcons name="loop" size={scale(21)} color={Colors.White} />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   Image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: scale(360),
//   },
//   ImageBox: {
//     aspectRatio: 1 / 1,
//     borderRadius: scale(360),
//     alignSelf: 'center',
//     marginTop: W * 0.2,
//     borderWidth: scale(7),
//     borderColor: Colors.ThemeOrange,
//   },
//   SongName: {
//     color: Colors.White,
//     fontFamily: Font.Gilroy700,
//     fontSize: W * 0.09,
//     textAlign: 'center',
//     marginTop: W * 0.14,
//   },
//   Name: {
//     color: '#A9A9A9',
//     fontFamily: Font.Inter400,
//     fontSize: W * 0.05,
//     textAlign: 'center',
//   },
//   Time: {
//     fontFamily: Font.Gilroy600,
//     fontSize: scale(13),
//     color: Colors.Main,
//   },
//   sendVoice: {
//     backgroundColor: '#F93420',
//     height: scale(50),
//     width: scale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 100,
//     paddingLeft: 2,
//   },
// });
// export default Music;
