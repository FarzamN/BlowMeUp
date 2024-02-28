import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import MainHeader from '../../components/Header/MainHeader';
import {Colors} from '../../utils/Colors';
import EmptyCard from '../../components/Card/EmptyCard';
import {verticalScale} from 'react-native-size-matters';
import VrCard from '../../components/Card/VrCard';
import {show_all_VrLinks} from '../../redux/actions/UserAction';
import {GeneratoinItem} from '../../Constants/SongData';
import AlertLoader from '../../components/Modal/AlertLoader';

const AllVrLinks = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [VrData, setVrData] = useState(false);
  const [load, setLoad] = useState(false);
  console.log('VrData', VrData);
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      show_all_VrLinks(setVrData, setLoad);
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    show_all_VrLinks(setVrData, setLoad);
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader Title BackArrow Notification Text={'All Vr Links'} />
      {load ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={GeneratoinItem}
            renderItem={() => <AlertLoader />}
          />
        </>
      ) : (
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
            return <View style={{height: verticalScale(10)}} />;
          }}
          ListEmptyComponent={() => {
            return <EmptyCard />;
          }}
          renderItem={({item}) => {
            return <VrCard key={item.id} data={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AllVrLinks;

const styles = StyleSheet.create({});
