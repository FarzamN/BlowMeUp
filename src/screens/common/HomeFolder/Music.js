import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MusicHeader from '../../../components/Header/MusicHeader';
import { Font } from '../../../utils/font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import { GlobalStyle } from '../../../Constants/GlobalStyle';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const Music = () => {
  const { width, height } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const playSound = () => {
    Sound.setCategory('Playback');
    const sound = new Sound('music.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
        sound.getDuration() +
        'number of channels: ' +
        sound.getNumberOfChannels(),
      );
      sound.play(() => {
        // Release when done
        sound.release();
        setPlaying(false);
        console.log('Sound finished playing');
      });
    });
    setSound(sound);
    setPlaying(true);
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
      sound.release();
    }
    setPlaying(false);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MusicHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
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
              { width: width <= 450 && height <= 700 ? W * 0.6 : W * 0.7 },
            ]}>
            <Image
              source={require('../../../assets/image/artist1.jpg')}
              style={styles.Image}
            />
          </View>
        </View>
        <Text style={styles.SongName}>As It Was</Text>
        <Text style={styles.Name}>Harry Styles</Text>
        <View style={[styles.Row, { marginVertical: verticalScale(20) }]}>
          <Text style={styles.Time}>1:39</Text>
          <Image source={require('../../../assets/image/Progress.png')} />
          <Text style={styles.Time}>4:12</Text>
        </View>
        <View style={styles.Row}>
          <Ionicons
            name="md-shuffle-outline"
            size={scale(20)}
            color={Colors.Grey}
          />
          <FontAwesome5
            name="step-backward"
            size={scale(20)}
            color={Colors.White}
          />

          {playing ? (
            <TouchableOpacity style={styles.sendVoice} onPress={stopSound}>
              <Ionicons name="pause" color={'#fff'} size={scale(25)} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sendVoice} onPress={playSound}>
              <Ionicons name="md-play" color={'#fff'} size={scale(25)} />
            </TouchableOpacity>
          )}
          <FontAwesome5
            name="step-forward"
            size={scale(20)}
            color={Colors.White}
          />
          <MaterialIcons name="loop" size={scale(21)} color={Colors.White} />
        </View>
      </ScrollView>
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
    marginTop: verticalScale(20),
    borderWidth: scale(7),
    borderColor: Colors.ThemeOrange,
  },
  SongName: {
    color: Colors.White,
    fontFamily: Font.Gilroy700,
    fontSize: W * 0.09,
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  Name: {
    color: '#A9A9A9',
    fontFamily: Font.Inter400,
    fontSize: W * 0.05,
    textAlign: 'center',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
