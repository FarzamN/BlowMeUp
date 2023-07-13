import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import MoVideoPlayer from 'react-native-mo-video-player';
import {scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeleteModal from '../Modal/DeleteModal';

const WIDTH = Dimensions.get('window').width;
const VideoCard = ({data, LikeWork}) => {
  const [liked, setLiked] = useState(false);
  const [Delete, setDelete] = useState(false);
  console.log('data', data);

  const HandelDelete = () => {
    console.log('first')
  }
  return (
    <>
      <View>
        <MoVideoPlayer
          style={{
            width: WIDTH,
            height: 250,
            marginTop: Platform.OS == 'ios' ? 30 : 10,
          }}
          source={{
            uri: data.video,
          }}
          poster={data.img}
          title={data.video_title}
          autoPlay={false}
          playInBackground={false}
          showHeader={true}
          showSeeking10SecondsButton={true}
          showCoverButton={false}
          showFullScreenButton={true}
          showSettingButton={true}
          showMuteButton={true}
        />
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.Text}>{data.description}</Text>
          <View style={[GlobalStyle.Row, {justifyContent: 'space-between'}]}>
            <View style={GlobalStyle.Row}>
              {LikeWork ? (
                <Pressable
                  onPress={() => setLiked(!liked)}
                  android_ripple={styles.ripple}>
                  <AntDesign
                    name={liked ? 'heart' : 'hearto'}
                    color={liked ? '#0FA549' : Colors.White}
                    size={scale(20)}
                  />
                </Pressable>
              ) : (
                <AntDesign name="heart" size={scale(20)} color="#0FA549" />
              )}

              <Text style={styles.Number}>{data.like ? data.like : 0}</Text>
              <Ionicons name="heart-dislike" size={scale(20)} color="#B00000" />
              <Text style={styles.Number}>
                {data.dislike ? data.dislike : 0}
              </Text>
            </View>

            <View style={GlobalStyle.Row}>
              <Pressable android_ripple={styles.ripple}>
                <MaterialCommunityIcons
                  name="movie-edit"
                  size={scale(22)}
                  color={Colors.ThemeCream}
                />
              </Pressable>
              <Pressable onPress={() => setDelete(true)} android_ripple={styles.ripple}>
                <MaterialCommunityIcons
                  name="delete"
                  size={scale(22)}
                  color="red"
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.Line} />
      </View>
      <DeleteModal visible={Delete} KeepPress={() => setDelete(false)} DeletePress={HandelDelete}/>
    </>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: scale(12),
    fontFamily: Font.Poppins400,
    color: Colors.White,
    marginVertical: verticalScale(15),
  },
  Number: {
    fontFamily: Font.Poppins400,
    fontSize: scale(12),
    color: Colors.White,
    marginHorizontal: scale(10),
  },
  Line: {
    borderWidth: scale(0.3),
    borderColor: Colors.White,
    marginVertical: verticalScale(10),
  },
  ripple: {
    color: Colors.Main,
    borderless: true,
    foreground: true,
  },
});

export default VideoCard;
