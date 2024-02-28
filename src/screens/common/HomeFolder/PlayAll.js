import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Pressable
  , Linking
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../../components/Header/MainHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../../utils/Colors';
import { Font } from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AlbumCard from '../../../components/Card/AlbumCard';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ModalRowItem from '../../../components/ModalRowItem';
import { useSelector } from 'react-redux';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import ImageViewModal from '../../../components/Modal/ImageViewModal';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const PlayAll = ({ navigation }) => {
  const data = useSelector(state => state.profile_Data);
  const video = useSelector(state => state.profile_Video);
  const picture = useSelector(state => state.profile_Image);
  const song = useSelector(state => state.profile_Song);

  const [shuffle, setShuffle] = useState(false);
  const [isMultiImageVisible, setIsMultiImageVisible] = useState(false);
  const [isDpViewVisible, setIsDpViewVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );



  const [multiImage, setMultiImage] = useState('')
  const [TheTitle, setTitle] = useState('')

  const showImage = (item) => {
    setIsMultiImageVisible(true)
    setMultiImage(item?.image)
    setTitle(item?.caption)
  }

  var url = `https://www.paypal.com/us/home`

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader Notification BackArrow Title Text={data.name} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.FirstBox}>
          <Pressable style={styles.ImageBox} onPress={() => setIsDpViewVisible(true)}>
            <Image
              style={styles.Image}
              resizeMode="cover"
              source={{ uri: data.image }}
            />
          </Pressable>
          {/* <Text style={styles.Name}>{data.name}</Text> */}

          <View style={[GlobalStyle.Row, styles.icon_ka_mainBox]}>
            {data.instagram != null && (
              <TouchableOpacity onPress={() => Linking.openURL(data.instagram)}>
                <Image style={styles.Image_icon} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png' }} />
              </TouchableOpacity>
            )}

            {data.facebook != null && (
              <Entypo onPress={() => Linking.openURL(data.facebook)} name='facebook' color='#1178F2' size={scale(20)} />
            )}

            {data.youtube != null && (
              <AntDesign onPress={() => Linking.openURL(data.youtube)} name='youtube' color='#FE0000' size={scale(20)} />
            )}
            {data.twitter != null && (
              <TouchableOpacity onPress={() => Linking.openURL(data.twitter)}>
                <Image style={styles.Image_icon} source={{ uri: 'https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_400x400.jpg' }} />
              </TouchableOpacity>
            )}


          </View>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Text style={styles.Donate}>Donate to artist with <Entypo name='paypal' color={Colors.White} size={scale(20)} /></Text>
          </TouchableOpacity>


          {/* <View style={GlobalStyle.Row}>
            <CustomButton
              title="Play All"
              Play
              containerStyle={styles.containerStyle}
              textStyle={styles.textStyle}
            />
            <TouchableOpacity
              onPress={() => setShuffle(!shuffle)}
              activeOpacity={0.6}
              style={[
                styles.IconBox,
                {
                  borderColor: shuffle ? Colors.ThemeBlue : Colors.ThemePurple,
                  backgroundColor: shuffle
                    ? Colors.ThemePurple
                    : Colors.ThemeBlue,
                },
              ]}>
              <Ionicons
                name="md-shuffle"
                color={shuffle ? Colors.ThemeBlue : Colors.ThemePurple}
                size={scale(30)}
              />
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <View style={styles.SecBox}>
          <Text
            style={[
              styles.Recent,
              {
                marginTop: verticalScale(10),
              },
            ]}>
            Recent Song
          </Text>
          <View
            style={[
              GlobalStyle.Row,
              {
                justifyContent: 'space-between',
                marginVertical: verticalScale(15),
              },
            ]}>
            <View style={GlobalStyle.Row}>
              <View style={styles.MusicIconBox}>
                <Fontisto
                  name="music-note"
                  size={scale(25)}
                  color={Colors.ThemePurple}
                />
              </View>
              <View style={{marginLeft: scale(7)}}>
                <Text style={[styles.Recent, {color: Colors.White}]}>
                  Dreams Tonite
                </Text>
                <View style={GlobalStyle.Row}>
                  <Text style={styles.AftNameText}>Alvvays</Text>
                  <Text
                    style={[styles.AftNameText, {marginHorizontal: scale(5)}]}>
                    •
                  </Text>
                  <Text style={styles.AftNameText}>09 March 2023</Text>
                </View>
              </View>
            </View>
            <Entypo
              name="dots-three-vertical"
              size={20}
              color={Colors.White}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View> */}
        {picture == null ? null : (
          <View style={styles.ThirdBox}>
            <Text
              style={[
                styles.Recent,
                {
                  marginLeft: scale(20),
                },
              ]}>
              Images
            </Text>
            <FlatList
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              data={picture}
              ListHeaderComponent={() => {
                return <View style={styles.Move} />;
              }}
              renderItem={({ item, index }) => {
                return (
                  <AlbumCard
                    onPress={() => showImage(item)}
                    key={index}
                    data={item}
                    source={{ uri: item.image }}
                    title={item.caption}
                  />
                );
              }}
            />
          </View>
        )}

        {video == null ? null : (
          <View style={styles.ThirdBox}>
            <Text
              style={[
                styles.Recent,
                {
                  marginLeft: scale(20),
                },
              ]}>
              Videos
            </Text>
            <FlatList
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              data={video}
              ListHeaderComponent={() => {
                return <View style={styles.Move} />;
              }}
              renderItem={({ item }) => {
                return (
                  <AlbumCard
                    data={item}
                    source={{ uri: item.img }}
                    title={item.video_title}
                    onPress={() =>
                      navigation.navigate('SingleVideo', { item: item })
                    }
                  />
                );
              }}
            />
          </View>
        )}
        {song == null ? null : (
          <View style={styles.ThirdBox}>
            <Text
              style={[
                styles.Recent,
                {
                  marginLeft: scale(20),
                },
              ]}>
              Songs
            </Text>
            <FlatList
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              data={song}
              ListHeaderComponent={() => {
                return <View style={styles.Move} />;
              }}
              renderItem={({ item }) => {
                return (
                  <AlbumCard
                    data={item}
                    source={{ uri: item.image }}
                    title={item.title}
                    onPress={() => navigation.navigate('Music', { item: item })}
                  />
                );
              }}
            />
          </View>
        )}

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          swipeDirection="down"
          onSwipeComplete={() => setModalVisible(false)}
          style={{ margin: 0, justifyContent: 'flex-end' }}>
          <View style={styles.ModalInsideBox}>
            <View style={GlobalStyle.ModalLine} />
            <ModalRowItem
              MaterialCommunityIcons
              name="music-note-plus"
              Title="Add to playlist"
            />
            <ModalRowItem
              MaterialIcons
              name="queue-music"
              Title="Add to Queue"
            />
          </View>
        </Modal>
      </ScrollView>
      <ConnectionModal />
      <ImageViewModal
        images={data.image}
        isVisible={isDpViewVisible}
        onClose={() => setIsDpViewVisible(false)}
      />
      <ImageViewModal
        images={multiImage}
        isVisible={isMultiImageVisible}
        onClose={() => setIsMultiImageVisible(false)}
        isTitle
        title={TheTitle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  FirstBox: {
    marginHorizontal: scale(20),
    alignItems: 'center',
  },
  SecBox: {
    marginHorizontal: scale(20),
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(20),
  },
  ImageBox: { width: W * 0.9, height: H * 0.3 },
  Name: {
    fontFamily: Font.NunitoSans700,
    fontSize: scale(25),
    textAlign: 'center',
    color: Colors.White,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  Donate: {
    fontFamily: Font.NunitoSans600,
    fontSize: scale(18),
    textAlign: 'center',
    color: Colors.White,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(20),
  },
  containerStyle: {
    backgroundColor: Colors.ThemePurple,
    borderWidth: 0,
    width: '75%',
  },
  textStyle: {
    color: Colors.White,
    fontFamily: Font.Inter500,
  },
  IconBox: {
    width: scale(50),
    aspectRatio: 1 / 1,
    borderWidth: scale(1),
    borderRadius: 100,
    marginLeft: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MusicIconBox: {
    backgroundColor: '#2B3151',
    width: scale(60),
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(15),
  },
  Recent: {
    color: Colors.Grey,
    fontFamily: Font.NunitoSans700,
    fontSize: scale(15),
  },
  AftNameText: {
    fontFamily: Font.NunitoSans400,
    color: '#8F9AA3',
    fontSize: scale(11),
  },
  ModalInsideBox: {
    backgroundColor: Colors.AshGrey,
    flex: 0.5,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  Move: { width: scale(22) },
  Image_icon: {
    width: scale(20)
    , height: scale(20)
    , resizeMode: 'contain',
    borderRadius: scale(5)
  },
  icon_ka_mainBox: { justifyContent: 'space-around', width: '50%', marginTop: verticalScale(10) }
});
export default PlayAll;
