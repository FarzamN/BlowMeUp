import React, { useState, useCallback } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EmptyCard from '../../../components/Card/EmptyCard';
import { show_own_link } from '../../../redux/actions/UserAction';
import { verticalScale } from 'react-native-size-matters';
import { GeneratoinItem } from '../../../Constants/SongData';
import AlertLoader from '../../../components/Modal/AlertLoader';
import { Colors } from '../../../utils/Colors';
import VrCard from '../../../components/Card/VrCard';

const VrLinks = () => {
    const [VrData, setVrData] = useState('');
    const [load, setLoad] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  
    useFocusEffect(
      useCallback(() => {
        show_own_link(setVrData, setLoad);
      }, []),
    );
    const onRefresh = () => {
      setRefreshing(true);
      show_own_link(setVrData, setLoad);
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
        data={VrData}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[Colors.Main]}
            tintColor={Colors.Main}
          />
        }
        keyExtractor={VrData.id}
        ListHeaderComponent={() => {
          return <View style={{ height: verticalScale(10) }} />;
        }}
        ListEmptyComponent={() => {
          return <EmptyCard />;
        }}
        renderItem={({ item }) => {
          return (
            <VrCard
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

export default VrLinks