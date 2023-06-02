import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import {Font} from '../../../utils/font';
import SongsItem from '../../../components/Card/SongsItem';

const PopularSong = ({navigation}) => {
  const params = [
    {
      id: '1',
      name: 'All',
      selected: true,
    },
    {
      id: '2',
      name: 'Song',
      selected: false,
    },
    {
      id: '3',
      name: 'Playlist',
      selected: false,
    },
    {
      id: '4',
      name: 'Artist',
      selected: false,
    },
    {
      id: '5',
      name: 'Podcast',
      selected: false,
    },
    {
      id: '6',
      name: 'Videos',
      selected: false,
    },
  ];
  const SongData = [
    {
      SongName: 'Cold',
      Playlist: 'Playlist',
      Name: 'Zarror',
      source: require('../../../assets/image/songitem1.jpg'),
      onPress: () => navigation.navigate('Music'),
    },
    {
      SongName: 'Podcastery Jurnalisa',
      Playlist: 'Podcast',
      Name: 'Jurnalisa',
      source: require('../../../assets/image/songitem2.jpg'),
    },
    {
      SongName: 'If the World Was Ending',
      Playlist: 'Album',
      Name: 'JP Saxe',
      source: require('../../../assets/image/songitem3.jpg'),
    },
    {
      SongName: 'Easy On Me',
      Playlist: 'Single',
      Name: 'Adele',
      source: require('../../../assets/image/songitem4.jpg'),
    },
    {
      SongName: 'Rap Me',
      Playlist: 'Playlist',
      Name: 'John',
      source: require('../../../assets/image/songitem5.jpg'),
    },
    {
      SongName: 'Yellow',
      Playlist: 'Singer',
      Name: 'Coldplay',
      source: require('../../../assets/image/songitem6.jpg'),
    },
    {
      SongName: 'Best Song Ever',
      Playlist: 'Album',
      Name: 'One Direction',
      source: require('../../../assets/image/songitem7.jpg'),
    },
  ];
  const [data, setData] = useState(params);
  const [select, setSelect] = useState(1);

  const handleChange = (item) => {
    setSelect(item.id)
  }
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.bubbleBox,
        {
          backgroundColor: select == item.id ? Colors.Main : Colors.White,
          marginLeft: item.id == 1 ? scale(15) : 0
        },
      ]}
      activeOpacity={0.9}
      onPress={() => handleChange(item)}>
    
      <Text
        style={[
          styles.bubbles,
          {
            fontSize: scale(14),
            color: select == item.id ? Colors.White : Colors.Black,
          },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        Notification={true}
        BackArrow={true}
        Title={true}
        Text="Popular Song"
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={SongData}
        renderItem={({item}) => {
          return <SongsItem data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue
  },
  bubbleBox: {
    borderRadius: scale(8),
    marginRight: scale(6),
    paddingHorizontal: moderateScale(16),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  bubbles: {
    textTransform: 'capitalize',
    fontFamily: Font.Inter400,
    fontSize: scale(14),
  },
});

export default PopularSong;
