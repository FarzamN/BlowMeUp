import { SafeAreaView, FlatList, RefreshControl, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import MainHeader from '../../components/Header/MainHeader';
import SectionCard from '../../components/Card/SectionCard';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';

import ConnectionModal from '../../components/Modal/ConnectionModal';
import SectionInput from '../../components/Card/SectionInput';
import { useDispatch, useSelector } from 'react-redux';
import { get_profile, show_all_image } from '../../redux/actions/UserAction';
import Loading from '../../components/Modal/Loading';
import BigSkeleton from '../../components/Modal/BigSkeleton';
import { Colors } from '../../utils/Colors';
import { verticalScale } from 'react-native-size-matters';

const PictureSection = ({ navigation }) => {
  const userDetails = useSelector(state => state.userDetails);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [Load, setLoad] = useState(false);

  const ImageFeeds = useSelector((state) => state.image)

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
      dispatch(show_all_image(userDetails));
    }, []),
  );

  const profilePress = item => {
    dispatch(get_profile(item, navigation, setLoad));
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(show_all_image(userDetails));
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/photo.png')}
        Title
        Text="Picture Section"
      />

      {userDetails.role_id == 2 && (
        <SectionInput onPress={() => navigation.navigate('ManageImage')} />
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
        data={ImageFeeds}
        ListEmptyComponent={() => (
          <>
            <BigSkeleton />
            <BigSkeleton />
            <BigSkeleton />
            <BigSkeleton />
            <BigSkeleton />
          </>
        )}
        renderItem={({ item, index }) => <SectionCard
          LikeWork
          data={item}
          key={item.id}
          index={index}
          profilePress={() => profilePress(item)}
        />}
      />
      <View style={{ height: verticalScale(60) }} />
      <ConnectionModal />
      <Loading isVisible={Load} />
    </SafeAreaView>
  );
};
export default PictureSection;
