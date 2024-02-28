import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import EmptyCard from '../../../components/Card/EmptyCard';
import SectionCard from '../../../components/Card/SectionCard';
import { show_own_image } from '../../../redux/actions/UserAction';
import { GeneratoinItem } from '../../../Constants/SongData';
import BigSkeleton from '../../../components/Modal/BigSkeleton';

const Image = () => {
  const [ImageData, setImageData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(false);

  useFocusEffect(
    useCallback(() => {
      show_own_image(setImageData, setLoad);
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    show_own_image(setImageData, setLoad);
    setRefreshing(false);
  };

  return load ? <>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={GeneratoinItem}
      renderItem={() => <BigSkeleton />}
    />
  </> : (
    <>
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={ImageData}
        keyExtractor={ImageData.id}
        ListEmptyComponent={() => <EmptyCard />}
        renderItem={({ item }) => <SectionCard key={item.id} data={item} LikeWork={false} Edit />}
      />
    </>
  )
}

export default Image