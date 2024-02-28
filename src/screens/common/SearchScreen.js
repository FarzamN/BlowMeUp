import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Pressable,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Colors } from '../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../../utils/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import RecentSong from '../../components/Card/RecentSong';
import {
  create_history,
  get_profile,
  search,
  show_search,
} from '../../redux/actions/UserAction';
import EmptyCard from '../../components/Card/EmptyCard';
import Loading from '../../components/Modal/Loading';
import { useDispatch, useSelector } from 'react-redux';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import AlertLoader from '../../components/Modal/AlertLoader';
const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetails);
  const History = useSelector(state => state.history);


  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState('');

  const [Load, setLoad] = useState(false);
  const [SearchLoad, setSearchLoad] = useState(false);

  const handleSearch = text => {
    search(text, setSearchData, setSearchLoad);
    setSearchQuery(text);
  };

  const handleCancel = () => {
    setSearchQuery('');
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      dispatch(show_search(userData, setLoading));
    }, []),
  );

  const onSearched = (item) => {
    if (item?.video) {
      navigation.navigate('SingleVideo', { item });
    } else if (item?.song) {
      navigation.navigate('Music', { item });
    } else {
      dispatch(get_profile(item, navigation, setLoad));
    }
    create_history(item);
  };


  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Ash }} />
      <StatusBar backgroundColor={Colors.Ash} />
      <View style={GlobalStyle.Container}>
        <View style={styles.InputBox}>
          <View style={GlobalStyle.Row}>
            <Pressable
              onPress={() => navigation.goBack()}
              android_ripple={{ color: Colors.Main, borderless: true }}>
              <AntDesign
                name="arrowleft"
                color={Colors.White}
                size={scale(22)}
              />
            </Pressable>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#A9A9A9"
              placeholder="Artists, Songs or Live Streams"
              onChangeText={text => handleSearch(text)}
              autoFocus
              value={searchQuery}
              returnKeyType='search'
            />
          </View>
          {searchQuery.length >= 1 ? (
            SearchLoad ? (
              <ActivityIndicator
                style={{ position: 'absolute', right: scale(20) }}
                color={Colors.Main}
                size={scale(25)}
              />
            ) : (
              <Pressable
                style={{ position: 'absolute', right: scale(20) }}
                onPress={handleCancel}>
                <Ionicons name="close-circle" color="#fff" size={scale(22)} />
              </Pressable>
            )
          ) : null}
        </View>

        {/* {searchData !== null && History == null   ? ( */}
        {loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <AlertLoader />
            <AlertLoader />
            <AlertLoader />
            <AlertLoader />
            <AlertLoader />
          </ScrollView>
        ) : (
          <FlatList
            data={searchData}
            keyExtractor={searchData.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return <View style={{ height: verticalScale(10) }} />;
            }}
            ListEmptyComponent={() => {
              return <EmptyCard />;
            }}
            renderItem={({ item }) => {
              return <RecentSong onPress={() => onSearched(item)} data={item} />;
            }}
          />
        )}

      </View>
      <Loading isVisible={Load} />
      <ConnectionModal />
    </>
  );
};

const styles = StyleSheet.create({
  InputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Ash,
    height: verticalScale(55),
    paddingHorizontal: moderateScale(15),
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  Input: {
    marginLeft: scale(7),
    width: '100%',
    color: Colors.White,
    fontFamily: Font.Inter400,
    fontSize: scale(14),
  },
  Recent: {
    fontSize: scale(14),
    fontFamily: Font.Gilroy600,
    marginLeft: scale(12),
    marginVertical: verticalScale(10),
  },
  noResultsText: {
    color: Colors.White,
    fontFamily: Font.Inter700,
    fontSize: scale(20),
    // , textAlign: 'center'
  },
  noResultsBox: {
    marginTop: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchScreen;
