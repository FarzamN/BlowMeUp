import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { Colors } from '../../utils/Colors';

import MainHeader from '../../components/Header/MainHeader';
import ListHeader from '../../components/Header/ListHeader';
import SongCard from '../../components/Card/SongCard';
import GernCard from '../../components/Card/GernCard';
import { Font } from '../../utils/font';
import Loading from '../../components/Modal/Loading';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const PopularData = [
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
    },
  ];
  const GenreData = [
    {
      Genre: 'Genre',
      pop: 'Pop',
      lastGernText: 'Pop',
      source: require('../../assets/image/gradiant1.png'),
      Type: 'first'
    },
    {
      Genre: 'Genre',
      pop: 'Kpop',
      lastGernText: 'Kpop',
      source: require('../../assets/image/gradiant2.png'),
    },
    {
      Genre: 'Genre',
      pop: 'Country',
      lastGernText: 'Country',
      source: require('../../assets/image/gradiant3.png'),
    },
  ];
  const RecentData = [
    {
      Song: 'Ghost',
      Singer: 'Justin Bieber',
      source: require('../../assets/image/Recent1.jpg'),
      Type: 'first'
    },
    {
      Song: 'Shivers',
      Singer: 'Ed Sheeran',
      source: require('../../assets/image/Recent2.jpg'),
    },
    {
      Song: 'Happier',
      Singer: 'Olivia Radrigo',
      source: require('../../assets/image/Recent3.jpg'),
    },
  ];
  setTimeout(() => {
    setLoading(false)
  }, 2000);
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar
      })
    }),
  )
  return loading ? <Loading /> : (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/home.png')}
        Title
        Text="Dashboard"
      // False
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListHeader
          Logo
          Icon
          Text="More"
          source={require('../../assets/image/fire.png')}
          Title="Popular Song"
          onPress={() => navigation.navigate('PopularSong')}
        />
        <FlatList
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={PopularData}
          renderItem={({ item }) => {
            return <SongCard data={item} onPress={() => navigation.navigate('PlayAll')} />;
          }}
        />
        <ListHeader Title="By Genre" Icon={true} Text="More" />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={GenreData}
          renderItem={({ item }) => {
            return <GernCard data={item} />;
          }}
        />
        <ListHeader Title="Recent" Icon={true} Text="More" />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={RecentData}
          renderItem={({ item }) => {
            return <SongCard data={item} onPress={() => navigation.navigate('PlayAll')} />;
          }}
        />
        <ListHeader
          Title="Artists"
          TitleRestyle={{
            fontSize: scale(20),
            fontFamily: Font.Roboto700,
            color: Colors.White,
          }}
          Icon={true}
          Text="More"
        />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={RecentData}
          renderItem={({ item }) => {
            return <SongCard data={item} onPress={() => navigation.navigate('PlayAll')} />;
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

export default Dashboard;
