import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import { Font } from '../../../utils/font';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { GenreData, params } from '../../../Constants/SongData';
import RecentSong from '../../../components/Card/RecentSong';
import { all_songs, song_type } from '../../../redux/actions/UserAction';
import EmptyCard from '../../../components/Card/EmptyCard';
import { useDispatch } from 'react-redux';
import ConnectionModal from '../../../components/Modal/ConnectionModal';
import AlertLoader from '../../../components/Modal/AlertLoader';

const PopularSong = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const [GetData, setGetData] = useState('');
  const [Load, setLoad] = useState(false);
  const [GetAllSongs, setGetAllSongs] = useState('');

  const allSong = item === 'allSongs';
  const type = item.name;

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      {
        allSong
          ? dispatch(all_songs(setGetAllSongs, setLoad))
          : song_type(setGetData, type, setLoad);
      }
    }, []),
  );

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        Notification
        BackArrow
        Title
        Text={allSong ? 'Songs' : item.name}
      />

      {Load ? (
        <FlatList showsVerticalScrollIndicator={false}
          data={GenreData}
          key={(item) => item.id}
          renderItem={() => {
            return <AlertLoader />
          }}
        />
      ) : (
        <FlatList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={allSong ? GetAllSongs : GetData}
          ListEmptyComponent={() => {
            return <EmptyCard />;
          }}
          renderItem={({ item, index }) => {
            console.log('item ===>', item)
            return (
              <RecentSong
                data={item}
                onPress={() =>
                  navigation.navigate('Music', { item, index })
                }
              />
            );
          }}
        />
      )}

      <ConnectionModal />
    </SafeAreaView>
  );
};

export default PopularSong;
