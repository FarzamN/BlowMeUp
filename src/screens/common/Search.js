import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {moderateScale, scale} from 'react-native-size-matters';
import MainHeader from '../../components/Header/MainHeader';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import GenerationCard from '../../components/Card/GenerationCard';
import LinearGradient from 'react-native-linear-gradient';
import {  } from '@react-native-material/core';
const Search = ({navigation}) => {
  const GeneratoinItem = [
    {
      Text: 'Pop',
      source: require('../../assets/image/generation1.jpg'),
    },
    {
      Text: 'Jazz',
      source: require('../../assets/image/generation2.jpg'),
    },
    {
      Text: 'Rock',
      source: require('../../assets/image/generation3.jpg'),
    },
    {
      Text: 'R&B',
      source: require('../../assets/image/generation4.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        Notification={false}
        Search={true}
        Title={true}
        Text="Search"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.MainBox}>
          <Pressable style={styles.InputBox} onPress={() => navigation.navigate('SearchScreen')}>
            <Feather name="search" color="#626262" size={scale(20)} />
            <Text style={styles.Input}>Artists, Songs or Live Streams</Text>
          </Pressable>
         
          <Text style={styles.TopGenres}>Top Genres</Text>

          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={GeneratoinItem}
            renderItem={({item}) => {
              return <GenerationCard data={item} />;
            }}
          />
          <Text style={[styles.TopGenres, {fontFamily: Font.Gilroy700}]}>
            Pod Cast
          </Text>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#AB5EC1', '#7994E2', '#3E4161']}
            style={styles.linearGradient}>
            <View style={[styles.Row, styles.PodcastBox]}>
              <View style={styles.Row}>
                <FontAwesome
                  name="microphone"
                  color={Colors.White}
                  size={scale(30)}
                />
                <Text
                  style={[
                    styles.TopGenres,
                    {
                      fontFamily: Font.Gilroy700,
                      color: Colors.White,
                      fontSize: scale(20),
                      marginHorizontal: scale(20),
                    },
                  ]}>
                  Pod Casts
                </Text>
              </View>
              <Ionicons
                name="play-circle"
                color={Colors.White}
                size={scale(35)}
              />
            </View>
          </LinearGradient>
          <Text style={[styles.TopGenres, {fontFamily: Font.Gilroy700}]}>
            Top Artist
          </Text>
          <View style={[styles.Row, {justifyContent: 'space-between'}]}>
            <Image
              style={styles.ArtistImage}
              source={require('../../assets/image/artist1.jpg')}
            />
            <Image
              style={styles.ArtistImage}
              source={require('../../assets/image/artist2.jpg')}
            />
          </View>
        </View>
        <View style={{height: verticalScale(10)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },

  InputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: scale(10),
    height: verticalScale(55),
    paddingHorizontal: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Input: {
    marginLeft: scale(7),
    width: '100%',
    color: '#A9A9A9',
    fontFamily: Font.Inter400,
  },
  MainBox: {
    paddingHorizontal: moderateScale(15),
  },
  TopGenres: {
    color: Colors.Yellow,
    fontFamily: Font.Gilroy500,
    fontSize: scale(18),
    marginVertical: verticalScale(20),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PodcastBox: {
    width: '100%',
    height: verticalScale(66),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  linearGradient: {
    borderRadius: scale(15),
  },
  ArtistImage: {
    width: scale(140),
    height: scale(140),
    borderRadius: 360,
  },
});

export default Search;
