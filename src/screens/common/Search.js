import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors } from '../../utils/Colors';
import { moderateScale, scale } from 'react-native-size-matters';
import MainHeader from '../../components/Header/MainHeader';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { verticalScale } from 'react-native-size-matters';
import { Font } from '../../utils/font';
import GenerationCard from '../../components/Card/GenerationCard';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { get_profile, leaderboard } from '../../redux/actions/UserAction';
import { GeneratoinItem } from '../../Constants/SongData';
import Skeleton from '../../components/Modal/Skeleton';
import { useDispatch } from 'react-redux';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import SearchSkeleton from '../../components/Modal/SearchSkeleton';
import Loading from '../../components/Modal/Loading';
import ListHeader from '../../components/Header/ListHeader';
const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const [Data, setData] = useState('');
  const Days = 30;
  const [Load, setLoad] = useState(false);
  const [ProfLoad, setProfLoad] = useState(false);
  useFocusEffect(
    useCallback(() => {
      leaderboard(setLoad, Days, setData);
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
    }, []),
  );

  const profilePress = item => {
    dispatch(get_profile(item, navigation, setProfLoad));
  };

  return Load ? <SearchSkeleton /> : (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader Search Title NoSearch Text="Search" />
      <ScrollView showsVerticalScrollIndicator={false}>
       
        <View style={styles.MainBox}>
          <TouchableOpacity
            style={styles.InputBox}
            onPress={() => navigation.navigate('SearchScreen')}>
            <Feather name="search" color="#626262" size={scale(20)} />
            <Text style={styles.Input}>Artists, Songs or Live Streams</Text>
          </TouchableOpacity>

          <ListHeader
          Logo
          Text="All Links"
          source={require('../../assets/image/line.png')}
          Title="Vr Links"
          onPress={() => navigation.navigate('allVrLinks')}
        />

          <Text style={styles.TopGenres}>Top Genres</Text>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            {GeneratoinItem.map((item, index) => {
              return (
                <>
                  <GenerationCard
                    data={item}
                    key={index}
                    onPress={() =>
                      navigation.navigate('PopularSong', { item })
                    }
                  />
                </>
              );
            })}
          </View>
          <Text style={[styles.TopGenres, { fontFamily: Font.Gilroy700 }]}>
            Pod Cast
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllVideos', { name: 'podcast' })}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['#AB5EC1', '#7994E2', '#3E4161']}
              style={styles.linearGradient}>
              <View style={[styles.Row, styles.PodcastBox]}>
                <View style={styles.Row}>
                  <FontAwesome
                    name="microphone"
                    color={Colors.White}
                    size={scale(30)}
                  />
                  <Text
                    style={[
                      styles.TopGenres,
                      {
                        fontFamily: Font.Gilroy700,
                        color: Colors.White,
                        fontSize: scale(20),
                        marginHorizontal: scale(20),
                      },
                    ]}>
                    Pod Casts
                  </Text>
                </View>
                <Ionicons
                  name="play-circle"
                  color={Colors.White}
                  size={scale(35)}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={[styles.TopGenres, { fontFamily: Font.Gilroy700 }]}>
            Top Artist
          </Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Data.top_user}
          ListEmptyComponent={() => (
            <>
              <Skeleton ChangeBorderRadius />
              <Skeleton ChangeBorderRadius />
              <Skeleton ChangeBorderRadius />
            </>
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={() => profilePress(item)}>
                <Image
                  data={item}
                  style={GlobalStyle.ArtistImage}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={() => Data.id}
          showsVerticalScrollIndicator={false}
        />

      </ScrollView>
        <View style={{ height: verticalScale(60) }} />
      <ConnectionModal />
      <Loading isVisible={ProfLoad} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  InputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: scale(10),
    height: verticalScale(55),
    paddingHorizontal: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Input: {
    marginLeft: scale(7),
    width: '100%',
    color: '#A9A9A9',
    fontFamily: Font.Inter400,
  },
  MainBox: {
    paddingHorizontal: moderateScale(15),
  },
  TopGenres: {
    color: Colors.Yellow,
    fontFamily: Font.Gilroy500,
    fontSize: scale(18),
    marginVertical: verticalScale(20),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PodcastBox: {
    width: '100%',
    height: verticalScale(66),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  linearGradient: {
    borderRadius: scale(15),
  },
});

export default Search;
