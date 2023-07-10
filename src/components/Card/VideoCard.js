import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Like} from '../Like';
import MoVideoPlayer from 'react-native-mo-video-player';
import {scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const WIDTH = Dimensions.get('window').width;
const VideoCard = ({data, LikeWork}) => {
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
          poster="https://img.freepik.com/premium-psd/dj-club-night-party-social-media-flyer-template_591079-216.jpg?size=626&ext=jpg"
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
          <Text style={styles.Text}>{data.Description}</Text>
          <View style={GlobalStyle.Row}>
            {LikeWork ? (
              <Like />
            ) : (
              <AntDesign name="heart" size={scale(20)} color="#0FA549" />
            )}

            <Text style={styles.Number}>{data.like}</Text>
            <Ionicons name="heart-dislike" size={scale(20)} color="#B00000" />
            <Text style={styles.Number}>{data.dislike}</Text>
          </View>
        </View>
        <View style={styles.Line} />
      </View>
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
});

export default VideoCard;
