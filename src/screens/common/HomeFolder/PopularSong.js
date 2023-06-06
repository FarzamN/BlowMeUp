import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import { Font } from '../../../utils/font';
import SongsItem from '../../../components/Card/SongsItem';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { SongData } from '../../../Constants/SongData';
const PopularSong = ({ navigation }) => {
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
 
  const [data, setData] = useState(params);
  const [select, setSelect] = useState(1);

  const handleChange = (item) => {
    setSelect(item.id)
  }
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar
      })
    }),
  )
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bubbleBox,
        {
          backgroundColor: select == item.id ? Colors.Main : Colors.White,
          // backgroundColor: 'red',
          marginLeft: item.id == 1 ? scale(15) : 0
        },
      ]}
      activeOpacity={0.9}
      onPress={() => handleChange(item)}>

      <Text
        style={[
          styles.bubbles,
          {
            color: select == item.id ? Colors.White : Colors.Black,
          },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={GlobalStyle.Container}>
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
        renderItem={({ item }) => {
          return <SongsItem data={item} onPress={() => navigation.navigate('Music',{data: item})} />;
        }}
      />
      {/* {SongData?.map(item => {
        return <SongsItem data={item} key={item.id} />;
      })} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bubbleBox: {
    borderRadius: scale(8),
    marginRight: scale(6),
    paddingHorizontal: moderateScale(13),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(-50),
  },
  bubbles: {
    textTransform: 'capitalize',
    fontFamily: Font.Inter400,
    fontSize: scale(12),
  },
});

export default PopularSong
