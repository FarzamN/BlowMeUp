import { StatusBar, SafeAreaView, FlatList, RefreshControl, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import MainHeader from '../../components/Header/MainHeader';
import { Colors } from '../../utils/Colors';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import SectionInput from '../../components/Card/SectionInput';
import VideoCard from '../../components/Card/VideoCard';
import { get_profile, show_all_video } from '../../redux/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Modal/Loading';
import BigSkeleton from '../../components/Modal/BigSkeleton';
import { verticalScale } from 'react-native-size-matters';

const VlogSection = ({ navigation }) => {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const [Load, setLoad] = useState(false);
  const [VideoData, setVideoData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
    }),
  );

  useFocusEffect(
    useCallback(() => {
      show_all_video(setVideoData, userDetails);
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    show_all_video(setVideoData, userDetails);
    setRefreshing(false);
  };
  const profilePress = item => {
    dispatch(get_profile(item, navigation, setLoad));
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/video.png')}
        Title
        Text="Vlog Section"
      />
      {userDetails.role_id == 2 && (
        <SectionInput onPress={() => navigation.navigate('Manage')} />
      )}

      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[Colors.ThemeBlue]}
            tintColor={Colors.ThemeBlue}
          />
        }
        data={VideoData}
        ListEmptyComponent={() => (
          <>
            <BigSkeleton />
            <BigSkeleton />
            <BigSkeleton />
            <BigSkeleton />
            <BigSkeleton />
          </>
        )}
        renderItem={({ item, index }) => {
          return (
            <VideoCard
              LikeWork
              data={item}
              index={index}
              key={item.id}
              showFullScreenButton={false}
              profilePress={() => profilePress(item)}
              singleScreenNavigate={() => navigation.navigate('SingleVideo', {
                item
              })}
            />
          );
        }}
      />
            <View style={{ height: verticalScale(60) }} />
      <ConnectionModal />
      <Loading isVisible={Load} />
    </SafeAreaView>
  );
};

export default VlogSection;
