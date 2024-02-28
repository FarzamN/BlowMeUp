import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../utils/Colors';

import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeleteModal from '../Modal/DeleteModal';
import {
  Delete_Image,
  dislikedPost,
  likedPost,
} from '../../redux/actions/UserAction';
import Loading from '../Modal/Loading';
import {useNavigation} from '@react-navigation/native';
import ImageViewModal from '../Modal/ImageViewModal';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const SectionCard = ({data, LikeWork, profilePress, Edit, index}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let ImageFeeds = useSelector(state => state.image);

  const userDetails = useSelector(state => state.userDetails);

  const [isDpViewVisible, setIsDpViewVisible] = useState(false);
  const [isPictureVisible, setIsPictureVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [heart, setHeart] = useState(false);

  const [Delete, setDelete] = useState(false);
  const [Load, setLoad] = useState(false);

  const HandelDelete = () => {
    Delete_Image(data, setDelete, setLoad,navigation);
  };

  const likedData = () => {
    dispatch(likedPost(data, userDetails, ImageFeeds, index));
    setLiked(!liked);
    setHeart(false);
  };
  const heartData = () => {
    dislikedPost(data, userDetails);
    setLiked(false);
    setHeart(!heart);
  };
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={profilePress}
        android_ripple={styles.ripple}
        style={[GlobalStyle.Row, styles.ProfileButton]}>
        <TouchableOpacity onPress={() => setIsDpViewVisible(true)}>
          <Image style={styles.Dp} source={{uri: data.profile_image}} />
        </TouchableOpacity>
        <View>
          <Text style={styles.Name}>{data.name}</Text>
          <Text style={styles.Time}>
            {moment(data.updated_at).format('MMM Do YY')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsPictureVisible(true)}
        style={styles.ImageBox}>
        {isLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size="large"
            color={Colors.Main}
          />
        )}
        <ImageBackground
          onLoadEnd={() => setIsLoading(false)}
          resizeMode="cover"
          style={[
            styles.Image,
            {justifyContent: 'center', alignItems: 'center'},
          ]}
          source={{uri: data.image}}
        />
      </TouchableOpacity>
      <View style={{marginHorizontal: 20}}>
        <Text style={styles.Text}>{data.caption}</Text>

        <View style={[GlobalStyle.Row, {justifyContent: 'space-between'}]}>
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
                {Edit ? (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('EditImage', {
                        Values: data,
                      })
                    }
                    android_ripple={styles.ripple}>
                    <MaterialCommunityIcons
                      name="image-edit"
                      size={scale(22)}
                      color={Colors.ThemeCream}
                    />
                  </Pressable>
                ) : null}

                <Text style={{color: Colors.Non}}>-</Text>
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
      <DeleteModal
        visible={Delete}
        KeepPress={() => setDelete(false)}
        OnClose={() => setDelete(false)}
        DeletePress={HandelDelete}
        value="this Image"
        points
      />
      <Loading isVisible={Load} />
      <ImageViewModal
        images={data.profile_image}
        isVisible={isDpViewVisible}
        onClose={() => setIsDpViewVisible(false)}
      />
      <ImageViewModal
        images={data.image}
        isVisible={isPictureVisible}
        onClose={() => setIsPictureVisible(false)}
        isTitle
        title={data.caption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(20),
    borderBottomWidth: scale(1),
    borderBottomColor: Colors.Grey,
    paddingBottom: moderateVerticalScale(20),
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
  ImageBox: {
    width: W * 0.95,
    height: H * 0.3,
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  Text: {
    fontSize: scale(12),
    fontFamily: Font.Poppins400,
    color: Colors.White,
    marginVertical: verticalScale(15),
  },
  heartImage: {
    width: scale(22),
    height: scale(22),
    marginRight: scale(8),
  },
  Number: {
    fontFamily: Font.Poppins400,
    fontSize: scale(12),
    color: Colors.White,
    marginHorizontal: scale(10),
  },
  Dp: {
    width: scale(40),
    height: scale(40),
    borderRadius: 100,
    marginHorizontal: scale(10),
  },
  ripple: {
    color: Colors.Main,
    borderless: true,
    foreground: true,
  },
  ProfileButton: {borderRadius: scale(5), overflow: 'hidden'},
});

export default SectionCard;
