import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import StreamCard from '../../components/Card/StreamCard';
import MainHeader from '../../components/Header/MainHeader';
import ListHeader from '../../components/Header/ListHeader';
import { GlobalStyle } from '../../Constants/GlobalStyle';

const LiveStreams = () => {
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
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification={true}
        Logo={true}
        source={require('../../assets/image/line.png')}
        Title={true}
        Text="Live Streams"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListHeader Title="Live Streams" Icon={true} Text="More" />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={PopularData}
          renderItem={({ item }) => {
            return <StreamCard data={item} />;
          }}
        />
        <ListHeader Title="Pod Cast" Icon={true} Text="More" />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={PopularData}
          renderItem={({ item }) => {
            return <StreamCard data={item} />;
          }}
        />
        <ListHeader Title="Music Videos" Icon={true} Text="More" />
        <FlatList
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={PopularData}
          renderItem={({ item }) => {
            return <StreamCard data={item} />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LiveStreams;
