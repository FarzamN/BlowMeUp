import { FlatList, View, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EmptyCard from '../../../components/Card/EmptyCard';
import { show_own_song } from '../../../redux/actions/UserAction';
import { verticalScale } from 'react-native-size-matters';
import RecentSong from '../../../components/Card/RecentSong';
import { GeneratoinItem } from '../../../Constants/SongData';
import AlertLoader from '../../../components/Modal/AlertLoader';
import { Colors } from '../../../utils/Colors';

const Audio = () => {
  const navigation = useNavigation();
  const [SongData, setSongData] = useState('');
  const [load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      show_own_song(setSongData, setLoad);
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    show_own_song(setSongData, setLoad);
    setRefreshing(false);
  };
  return load ? <>
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={GeneratoinItem}
        renderItem={() => <AlertLoader />}
      />

    </>
  </> : (
    <>
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        data={SongData}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[Colors.Main]}
            tintColor={Colors.Main}
          />
        }
        keyExtractor={SongData.id}
        ListHeaderComponent={() => {
          return <View style={{ height: verticalScale(10) }} />;
        }}
        ListEmptyComponent={() => {
          return <EmptyCard />;
        }}
        renderItem={({ item, index }) => {
          return (
            <RecentSong
              onPress={() =>
                navigation.navigate('Music', {
                  index: index,
                  item: item,
                  // type: 'all',
                })
              }
              key={item.id}
              data={item}
              Edit={true}
            />
          );
        }}
      />
    </>
  );
};
export default Audio;
