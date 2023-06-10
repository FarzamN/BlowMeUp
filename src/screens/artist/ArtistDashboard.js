import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useCallback } from 'react';
import {Colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import ListHeader from '../../components/Header/ListHeader';
import SongCard from '../../components/Card/SongCard';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';

const ArtistDashboard = ({navigation}) => {
  const PodCastsData = [
    {
      Song: 'Ghost',
      Singer: 'Justin Bieber',
      source: require('../../assets/image/song1.jpg'),
      Type: 'first'
    },
    {
      Song: 'Shivers',
      Singer: 'Ed Sheeran',
      source: require('../../assets/image/song2.jpg'),
    },
    {
      Song: 'Happier',
      Singer: 'Olivia Radrigo',
      source: require('../../assets/image/song3.jpg'),
      Type: 'last',
    },
  ];
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar
      })
    }),
  )
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.ThemeBlue}
        barStyle={'light-content'}
      />
      <MainHeader
        Notification={true}
        Logo={true}
        source={require('../../assets/image/home.png')}
        Title={true}
        Text="Dashboard"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListHeader
          Logo
          Text="LIVE NOW"
          source={require('../../assets/image/line.png')}
          Title="Live Stream"
          //   onPress={() => navigation.navigate('PopularSong')}
        />
        <ListHeader Title="Pod Casts" UploadTrue/>
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={PodCastsData}
          renderItem={({item}) => {
            return <SongCard data={item} />;
          }}
        />
        <ListHeader Title="Music Videos" UploadTrue={true} UploadVideo={true} />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={PodCastsData}
          renderItem={({item}) => {
            return <SongCard data={item} />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
    // paddingLeft: moderateScale(12),
  },
});
export default ArtistDashboard;
