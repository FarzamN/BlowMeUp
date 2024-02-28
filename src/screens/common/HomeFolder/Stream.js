import { FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { show_own_streams } from '../../../redux/actions/UserAction';
import { useFocusEffect } from '@react-navigation/native';
import EmptyCard from '../../../components/Card/EmptyCard';
import IFrameCard from '../../../components/Card/IFrameCard';
import { GeneratoinItem } from '../../../Constants/SongData';
import BigSkeleton from '../../../components/Modal/BigSkeleton';

const Stream = () => {
  const [StreamData, setStreamData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(false);

  useFocusEffect(
    useCallback(() => {
      show_own_streams(setStreamData, setLoad);
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    show_own_streams(setStreamData, setLoad);
    setRefreshing(false);
  };
  return load ? <>
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={GeneratoinItem}
        renderItem={() => <BigSkeleton />}
      />

    </>
  </> : (
    <>
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={StreamData}
        keyExtractor={StreamData.id}
        ListEmptyComponent={() => {
          return <EmptyCard />;
        }}
        renderItem={({ item }) => <IFrameCard key={item.id} data={item} />}
      />
    </>
  );
};

export default Stream;
