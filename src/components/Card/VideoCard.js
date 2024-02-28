import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity
} from 'react-native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import MoVideoPlayer from 'react-native-mo-video-player';
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { Font } from '../../utils/font';
import { Colors } from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeleteModal from '../Modal/DeleteModal';
import {
  Delete_video,
  dislikedPost,
  likedPost,
} from '../../redux/actions/UserAction';
import Loading from '../Modal/Loading';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import ImageViewModal from '../Modal/ImageViewModal';

const WIDTH = Dimensions.get('window').width;
const VideoCard = ({ data, LikeWork, profilePress, showFullScreenButton, singleScreenNavigate }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.userDetails);

  const [isDpViewVisible, setIsDpViewVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const [heart, setHeart] = useState(false);

  const [Delete, setDelete] = useState(false);
  const [Load, setLoad] = useState(false);

  const HandelDelete = () => {
    Delete_video(data, setDelete, setLoad);
  };

  const likedData = () => {
    dispatch(likedPost(data, userDetails));
    setLiked(!liked);
    setHeart(false);
  };
  const heartData = () => {
    dislikedPost(data, userDetails);
    setLiked(false);
    setHeart(!heart);
  };
  return (
    <>
      <TouchableOpacity activeOpacity={LikeWork ? 0.6 : 1} onPress={singleScreenNavigate} style={styles.Container}>
        <TouchableOpacity
          onPress={profilePress}
          style={[GlobalStyle.Row, styles.ProfileButton]}>
          <TouchableOpacity onPress={() => setIsDpViewVisible(true)}>
            <Image style={styles.Dp} source={{ uri: data.profile_image }} />
          </TouchableOpacity>
          <View>
            <Text style={styles.Name}>{data.name}</Text>
            <Text style={styles.Time}>
              {moment(data.updated_at).format('MMM Do YY')}
            </Text>
          </View>
        </TouchableOpacity>
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
          showFullScreenButton={showFullScreenButton}
          showSettingButton={true}
          showMuteButton={true}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.Text}>{data.description}</Text>
          <View style={[GlobalStyle.Row, { justifyContent: 'space-between' }]}>
            <View style={GlobalStyle.Row}>
              {LikeWork ? (
                <>
                  <Pressable onPress={likedData} android_ripple={styles.ripple}>
                    <AntDesign
                      name={!liked ? 'hearto' : 'heart'}
                      color={!liked ? Colors.White : '#0FA549'}
                      size={scale(20)}
                    />
                  </Pressable>
                  <Text style={styles.Number}>
                    {liked ? parseInt(data.like) + 1 : data.like}
                  </Text>
                  <Pressable onPress={heartData} android_ripple={styles.ripple}>
                    <Ionicons
                      name={heart ? 'heart-dislike' : 'heart-dislike-outline'}
                      color={heart ? '#B00000' : Colors.White}
                      size={scale(20)}
                    />
                  </Pressable>
                  <Text style={styles.Number}>
                    {heart ? parseInt(data.dislike) + 1 : data.dislike}
                  </Text>
                </>
              ) : (
                <>
                  <AntDesign name="heart" size={scale(20)} color="#0FA549" />
                  <Text style={styles.Number}>{data.like ? data.like : 0}</Text>
                  <Ionicons
                    name="heart-dislike"
                    size={scale(20)}
                    color="#B00000"
                  />
                  <Text style={styles.Number}>
                    {data.dislike ? data.dislike : 0}
                  </Text>
                </>
              )}
            </View>
            {LikeWork ? null : (
              <>
                <View style={GlobalStyle.Row}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('EditVideo', {
                        Values: data,
                      })
                    }
                    android_ripple={styles.ripple}>
                    <MaterialCommunityIcons
                      name="movie-edit"
                      size={scale(22)}
                      color={Colors.ThemeCream}
                    />
                  </Pressable>
                  <Text style={{ color: Colors.Non }}>0</Text>
                  <Pressable
                    onPress={() => setDelete(true)}
                    android_ripple={styles.ripple}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={scale(22)}
                      color="red"
                    />
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <DeleteModal
        visible={Delete}
        KeepPress={() => setDelete(false)}
        OnClose={() => setDelete(false)}
        DeletePress={HandelDelete}
        value="this video"
        points
      />
      <Loading isVisible={Load} />
      <ImageViewModal
        images={data.profile_image}
        isVisible={isDpViewVisible}
        onClose={() => setIsDpViewVisible(false)}
      />
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
  ProfileButton: { borderRadius: scale(5), overflow: 'hidden' },
  Dp: {
    width: scale(40),
    borderRadius: 100,
    aspectRatio: 1 / 1,
    marginHorizontal: scale(10),
  },
  Name: {
    color: Colors.White,
    fontFamily: Font.Poppins500,
    fontSize: scale(15),
  },
  Time: {
    color: Colors.Grey,
    fontFamily: Font.Poppins400,
    fontSize: scale(12),
  },
  Container: {
    marginTop: verticalScale(20),
    borderBottomWidth: scale(1),
    borderBottomColor: Colors.Grey,
    paddingBottom: moderateVerticalScale(20),
  },
});

export default VideoCard;
