import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TouchableOpacity,
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

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const params = [
    {
      id: 1,
      title: 'Drakes',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 2,
      title: 'Gamora',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'One direction',
    },
    {
      id: 4,
      title: 'shazam',
      source: require('../../assets/image/album1.jpg'),
      Value: 'artist',
      Singer: 'justin biebeer',
    },
    {
      id: 5,
      title: 'Black pink',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Singer',
      Singer: 'enemy',
    },
    {
      id: 6,
      title: 'Black panter',
      source: require('../../assets/image/album2.jpg'),
      Value: 'artish',
      Singer: 'one moew',
    },
    {
      id: 7,
      title: 'ememim',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Singere',
      Singer: 'slim shady',
    },
    {
      id: 8,
      title: 'super man',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'us bro',
    },
    {
      id: 9,
      title: 'Batman',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Siger',
      Singer: 'some body to love',
    },
    {
      id: 10,
      title: 'spider man',
      source: require('../../assets/image/album1.jpg'),
      Value: 'artish',
      Singer: 'the hero',
    },
    {
      id: 11,
      title: 'cool boy',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'boy band',
    },
    {
      id: 12,
      title: 'bad girl',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'bad boy',
    },
    {
      id: 13,
      title: 'drunk',
      source: require('../../assets/image/album1.jpg'),
      Value: 'artish',
      Singer: 'drunk and drive',
    },
    {
      id: 14,
      title: 'One more',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'best song',
    },
    {
      id: 15,
      title: 'its done',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'heah',
    },
    {
      id: 16,
      title: 'okay man',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
  ];

  const handleSearch = (text) => {
    const filteredData = params.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.Value.toLowerCase().includes(text.toLowerCase()) ||
      item.Singer.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setFilteredData(filteredData);
  };
  const renderFilteredData = () => {
    if (filteredData.length === 0) {
      return <View style={styles.noResultsBox}><Text style={styles.noResultsText}>No results found.</Text></View>;
    }
    return filteredData.map((item, index) => (
      <RecentSong Data={item} key={item.id} />
    ));
  };
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.Ash }} />
      <View style={GlobalStyle.Container}>
        <StatusBar backgroundColor={Colors.Ash} barStyle={'light-content'} />

        <View style={styles.InputBox}>
          <View style={GlobalStyle.Row}>
            <AntDesign
              name="arrowleft"
              color={Colors.White}
              size={scale(22)}
              onPress={() => navigation.goBack()}
            />
            <TextInput
              style={styles.Input}
              placeholderTextColor="#A9A9A9"
              placeholder="Artists, Songs or Live Streams"
              onChangeText={(text) => handleSearch(text)}
              autoFocus
              value={searchQuery}
            />
          </View>
          {searchQuery.length >= 1 ? (
            <Pressable
              style={{
                alignSelf: 'center',
                position: 'absolute',
                right: scale(20)
              }}
              onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                color='#fff'
                size={scale(22)}
              />
            </Pressable>
          ) : null}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredData.length != 0 ? <Text style={styles.Recent}>Recent Searches</Text> : null}
          {renderFilteredData()}
          {filteredData.length != 0 ? <TouchableOpacity>
            <Text style={styles.Recent}>Clear recent search</Text>
          </TouchableOpacity> : null}

          <View style={{ height: verticalScale(10) }} />
        </ScrollView>
      </View>
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
    marginTop: verticalScale(10)
  },
  noResultsText: {
    color: Colors.White,
    fontFamily: Font.Inter700,
    fontSize: scale(20)
    // , textAlign: 'center'
  },
  noResultsBox: {
    marginTop: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default SearchScreen;
